// db.ts
import * as SQLite from 'expo-sqlite';

export interface Category {
    id: number;
    name: string;
    budget: number;
    remainingBudget: number;
    color: string;
}

export interface Transaction {
    id: number;
    name: string;
    amount: number; // positive for income, negative for expense
    categoryId: number;
    date: string; // ISO format (e.g., "2025-07-30")
}

let db: SQLite.SQLiteDatabase | null = null;

export const initDB = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('categories.db');
        //await db.execAsync(`DROP TABLE IF EXISTS categories;`);
        //await db.execAsync(`DROP TABLE IF EXISTS transactions;`);
        await db.execAsync(`PRAGMA journal_mode = WAL`);
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        budget REAL NOT NULL,
        remainingBudget REAL NOT NULL,
        color TEXT NOT NULL
      );
    `);

        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          amount REAL NOT NULL,
          categoryId INTEGER NOT NULL,
          date TEXT NOT NULL,
          FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
        );
      `);
    }
};

const getRandomColor = (usedColors: string[]): string | null => {
    const availableColors = [
        '#FF5733', // red-orange
        '#3498DB', // blue
        '#2ECC71', // green
        '#9B59B6', // purple
        '#F1C40F', // yellow
        '#E67E22', // orange
        '#E91E63', // pink
        '#A52A2A', // brown
        '#1ABC9C', // teal
        '#E74C3C', // red
    ].filter(color => !usedColors.includes(color));

    if (availableColors.length === 0) return null; // all colors taken

    const index = Math.floor(Math.random() * availableColors.length);
    return availableColors[index];
};

export const insertCategory = async (name: string, budget: number) => {
    if (!db) return;

    // Step 1: Get all used colors from existing categories
    const existing = await db.getAllAsync<Category>('SELECT color FROM categories');
    const usedColors = existing.map(c => c.color);

    // Step 2: Get a unique color
    const color = getRandomColor(usedColors);
    if (!color) {
        console.error("All colors are taken. Cannot assign a new color.");
        return;
    }

    const remainingBudget = budget;

    try {
        await db.runAsync(
            'INSERT INTO categories (name, budget, remainingBudget, color) VALUES (?, ?, ?, ?)',
            name,
            budget,
            remainingBudget,
            color
        );
    } catch (error) {
        console.error("Insert error:", error);
    }
};

export const getAllCategories = async (): Promise<Category[]> => {
    if (!db) return [];
    const categories = await db.getAllAsync<Category>('SELECT * FROM categories');
    console.log(categories);
    return await db.getAllAsync<Category>('SELECT * FROM categories');
};

export const deleteCategory = async (id: number) => {
    if (!db) return;
    await db.runAsync('DELETE FROM categories WHERE id = ?', id);
};

export const updateCategory = async (
    id: number,
    name: string,
    budget: number,
) => {
    if (!db) return;
    await db.runAsync(
        'UPDATE categories SET name = ?, budget = ? WHERE id = ?',
        name,
        budget,
        id
    );
};


// transactions Table Functions 

export const insertTransaction = async (
    name: string,
    amount: number,
    categoryId: number,
    date: string
) => {
    if (!db) return;
    try {
        await db.runAsync(
            'INSERT INTO transactions (name, amount, categoryId, date) VALUES (?, ?, ?, ?)',
            name,
            amount,
            categoryId,
            date
        );
    } catch (error) {
        console.error("Insert transaction error:", error);
    }
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
    if (!db) return [];
    return await db.getAllAsync<Transaction>('SELECT * FROM transactions ORDER BY date DESC');
};


export const deleteTransaction = async (id: number) => {
    if (!db) return;

    try {
        // 1. Get the transaction details before deletion
        const transaction = await db.getFirstAsync(
            "SELECT amount, categoryId FROM transactions WHERE id = ?",
            id
        );

        if (!transaction) return;

        const { amount, categoryId } = transaction;

        // 2. Reverse its effect on remainingBudget
        await db.runAsync(
            "UPDATE categories SET remainingBudget = remainingBudget - ? WHERE id = ?",
            amount,
            categoryId
        );

        // 3. Delete the transaction
        await db.runAsync('DELETE FROM transactions WHERE id = ?', id);

    } catch (error) {
        console.error("Error deleting transaction and updating remainingBudget:", error);
    }
};

export const updateTransaction = async (
    id: number,
    name: string,
    newAmount: number,
    newCategoryId: number,
    date: string
) => {
    if (!db) return;

    try {
        // 1. Get the old transaction (its amount and category)
        const oldTransaction = await db.getFirstAsync(
            "SELECT amount, categoryId FROM transactions WHERE id = ?",
            id
        );

        if (!oldTransaction) return;

        const oldAmount = oldTransaction.amount;
        const oldCategoryId = oldTransaction.categoryId;

        // 2. Reverse the old amount
        await db.runAsync(
            "UPDATE categories SET remainingBudget = remainingBudget - ? WHERE id = ?",
            oldAmount,
            oldCategoryId
        );

        // 3. Apply the new amount
        await db.runAsync(
            "UPDATE categories SET remainingBudget = remainingBudget + ? WHERE id = ?",
            newAmount,
            newCategoryId
        );

        // 4. Update the transaction itself
        await db.runAsync(
            'UPDATE transactions SET name = ?, amount = ?, categoryId = ?, date = ? WHERE id = ?',
            name,
            newAmount,
            newCategoryId,
            date,
            id
        );

    } catch (error) {
        console.error("Error updating transaction and adjusting remainingBudget:", error);
    }
};


export const subtractFromRemainingBudget = async (id: number, amount: number) => {
    if (!db) return;

    try {
        if (amount >= 0) {
            // Add positive amount to both budget and remainingBudget
            await db.runAsync(
                "UPDATE categories SET remainingBudget = remainingBudget + ? WHERE id = ?",
                amount,
                id
            );
        } else {
            // Subtract only from remainingBudget
            await db.runAsync(
                "UPDATE categories SET remainingBudget = remainingBudget + ? WHERE id = ?",
                amount, // amount is negative, so this subtracts
                id
            );
        }
    } catch (error) {
        console.error("Error updating remaining budget:", error);
    }
};
