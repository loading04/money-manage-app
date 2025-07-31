import { Card } from "@/components/ui/card";
import { PencilIcon, ShoppingBag, TrashIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
} from "react-native";
import {
    Category,
    Transaction,
    deleteTransaction,
    getAllCategories,
    getAllTransactions,
    insertTransaction,
    subtractFromRemainingBudget,
    updateTransaction,
} from "../db"; // adjust your db import if needed
import DateTimePicker from '@react-native-community/datetimepicker';
export default function Transactions() {

    const formatDate = (d: Date) => {
        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const today = new Date();
    const [date, setDate] = useState(formatDate(today)); // show today by default
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(today); // holds actual Date object
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        const txs = await getAllTransactions();
        const cats = await getAllCategories();
        setTransactions(txs);
        setCategories(cats);
    };

    useEffect(() => {
        const loadCategories = async () => {
            const cats = await getAllCategories();
            setCategories(cats);
        };
        loadCategories();
    }, [modalVisible]); // reloads when modal opens

    const resetForm = () => {
        setName("");
        setAmount("");
        setDate("");
        setCategoryId(null);
        setEditMode(false);
        setEditingId(null);
    };

    const handleAddOrUpdate = async () => {
        if (!name || !amount || !categoryId || !date) return;
        const parsedAmount = parseFloat(amount);
        if (editingId !== null) {
            await updateTransaction(editingId, name, parsedAmount, categoryId, date);
        } else {
            await insertTransaction(name, parsedAmount, categoryId, date);
            if (parsedAmount ) {
                await subtractFromRemainingBudget(categoryId, parsedAmount);
            }

        }
        resetForm();
        setModalVisible(false);
        loadTransactions();
    };
    

    const handleEdit = async (tx: Transaction) => {
        setName(tx.name);
        setAmount(String(tx.amount));
        setDate(tx.date);
        setCategoryId(tx.categoryId);
        setEditingId(tx.id);
        setEditMode(true);
        setModalVisible(true);

        await updateTransaction(tx.id,tx.name,tx.amount,tx.categoryId,tx.date);
    };

    const handleDelete = async (id: number) => {
        await deleteTransaction(id);
        await loadTransactions();
    };

    return (
        <View className="bg-white flex-1">
            <Card size="md" variant="outline" className="mb-4 m-4 shadow-sm bg-white">
                <View className="justify-between  px-4 py-2 mb-5">
                    <Text className="text-2xl font-semibold">Recent Transactions</Text>
                    <TouchableOpacity
                        className="bg-blue-500 rounded-xl p-3 mb-2"
                        onPress={() => {
                            resetForm();
                            setModalVisible(true);
                        }}
                    >
                        <Text className="text-white font-semibold">+ Add Transaction</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ maxHeight: 400 }}>
                    {transactions.map((tx) => {
                        const category = categories.find((c) => c.id === tx.categoryId);
                        return (
                            <View
                                key={tx.id}
                                className="flex-row justify-between items-center px-4 py-3 bg-white rounded-lg drop-shadow-sm mb-2"
                            >
                                <View className="flex-row items-center">
                                    <View className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center mr-3">
                                        <ShoppingBag size={18} color="#000" />
                                    </View>
                                    <View>
                                        <Text className="text-base font-semibold">{tx.name}</Text>
                                        <Text className="text-sm text-gray-500">{tx.date}</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center space-x-2">
                                    <Text className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">
                                        {category?.name || "Unknown"}
                                    </Text>
                                    <Text
                                        className={`text-base font-semibold ${tx.amount < 0 ? "text-red-600" : "text-green-600"
                                            }`}
                                    >
                                        {tx.amount < 0 ? `- $${Math.abs(tx.amount)}` : `+ $${tx.amount}`}
                                    </Text>
                                    <TouchableOpacity onPress={() => handleEdit(tx)}>
                                        <PencilIcon size={18} color="#000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(tx.id)}>
                                        <TrashIcon size={18} color="#dc2626" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </Card>

            {/* ➕ Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white rounded-xl p-5 w-11/12">
                        <Text className="text-xl font-bold mb-4">
                            {editMode ? "Update Transaction" : "Add Transaction"}
                        </Text>

                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            className="border border-gray-300 p-2 rounded mb-3"
                        />
                        <TextInput
                            placeholder="Amount (use - for expense)"
                            value={amount}
                            onChangeText={setAmount}
                            className="border border-gray-300 p-2 rounded mb-3"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPicker(true)}
                            className="border border-gray-300 p-2 rounded mb-3"
                        >
                            <Text className="text-gray-800">
                                {date ? date : "Select Date (DD-MM-YYYY)"}
                            </Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="spinner"
                                onChange={(event, chosenDate) => {
                                    if (chosenDate) {
                                        setSelectedDate(chosenDate);
                                        setDate(formatDate(chosenDate));
                                    }
                                    setShowPicker(false);
                                }}
                            />
                        )}
                    

                        {/* Categories dropdown */}
                        <ScrollView className="max-h-40 mb-3 border border-gray-300 rounded">
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    className={`p-2 ${cat.id === categoryId ? "bg-blue-100" : ""}`}
                                    onPress={() => setCategoryId(cat.id)}
                                >
                                    <Text>{cat.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View className="flex-row justify-end space-x-2">
                            <TouchableOpacity onPress={() => { setModalVisible(false); resetForm(); }}>
                                <Text className="text-gray-500 font-semibold">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleAddOrUpdate}>
                                <Text className="text-blue-600 font-semibold">
                                    {editMode ? "Update" : "Add"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
