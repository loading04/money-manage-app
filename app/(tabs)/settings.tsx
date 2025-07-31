import { TrashIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    Category,
    deleteCategory,
    getAllCategories,
    initDB,
    insertCategory,
} from "../db"; // adjust path as needed
export default function Settings() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState("");
    const [newBudget, setNewBudget] = useState("");

    useEffect(() => {
        const setup = async () => {
            await initDB();
            await loadCategories();
        };
        setup();
    }, []);

    const loadCategories = async () => {
        const rows = await getAllCategories();
        setCategories(rows);
    };

    const handleAddCategory = async () => {
        if (newName && newBudget) {
            await insertCategory(newName, parseFloat(newBudget));
            setNewName("");
            setNewBudget("");
            setModalVisible(false);
            await loadCategories();
        }
    };

    const handleDeleteCategory = async (id: number) => {
        await deleteCategory(id);
        await loadCategories();
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-blue-500 rounded-xl p-3 mb-4"
            >
                <Text className="text-white text-center text-lg">Add Category</Text>
            </TouchableOpacity>

            {/* Category Rows */}
            <ScrollView>
                {categories.map((cat, index) => (
                    <View
                        key={index}
                        className="flex-row items-center justify-between px-2 py-3 border-t border-gray-100"
                    >
                        {/* Color */}
                        <View className="flex-1">
                            <View style={{ backgroundColor: cat.color }} className="w-4 h-4 rounded-full" />
                        </View>

                        {/* Name */}
                        <Text className="flex-1 text-gray-900">{cat.name}</Text>

                        {/* Budget */}
                        <Text className="flex-1 text-gray-900 ml-10">{cat.budget.toFixed(2)}</Text>

                        {/* Actions */}
                        <View className="flex-1 flex-row justify-end space-x-4">
                            <TouchableOpacity onPress={() => handleDeleteCategory(cat.id)}>
                                <TrashIcon size={18} color="#dc2626"

                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            {/* MODAL */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View className="flex-1 justify-center items-center bg-black/30">
                    <View className="bg-white p-6 rounded-2xl w-11/12">
                        <Text className="text-lg font-bold mb-4">New Category</Text>
                        <TextInput
                            placeholder="Name"
                            value={newName}
                            onChangeText={setNewName}
                            className="border border-gray-300 rounded-xl px-4 py-2 mb-2"
                        />
                        <TextInput
                            placeholder="Budget"
                            keyboardType="numeric"
                            value={newBudget}
                            onChangeText={setNewBudget}
                            className="border border-gray-300 rounded-xl px-4 py-2 mb-2"
                        />
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="px-4 py-2 bg-gray-300 rounded-xl"
                            >
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleAddCategory}
                                className="px-4 py-2 bg-blue-500 rounded-xl"
                            >
                                <Text className="text-white">Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}