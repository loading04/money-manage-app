import { Card } from "@/components/ui/card";
import { PencilIcon, TrashIcon } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
export default function Settings() {
    const categories = [
        { name: 'Housing', budget: 1200, color: '#3B82F6' },
        { name: 'Food', budget: 500, color: '#22C55E' },
        { name: 'Transportation', budget: 300, color: '#FACC15' },
        { name: 'Entertainment', budget: 200, color: '#8B5CF6' },
        { name: 'Utilities', budget: 250, color: '#EF4444' },
    ];

    return (
        <View className="bg-white-300 mt-4">
            <Card size="md" variant="outline" className="mb-4 m-4 shadow-sm bg-white">
                {/* Header */}
                <Text className="text-xl font-bold text-gray-800 mb-4">Categories</Text>

                {/* Add Button */}
                <TouchableOpacity className="flex-row items-center bg-blue-600 px-3 py-2 rounded mb-4 self-start">
                    <Text className="text-white font-semibold text-base">+ Add Category</Text>
                </TouchableOpacity>

                {/* Table Headers */}
                <View className="flex-row justify-between px-2 mb-2">
                    <Text className="flex-1 font-semibold text-gray-500">Color</Text>
                    <Text className="flex-1 font-semibold text-gray-500">Name</Text>
                    <Text className="flex-1 font-semibold text-gray-500 ml-10">Budget</Text>
                    <Text className="flex-1 font-semibold text-gray-500 text-right">Actions</Text>
                </View>

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
                            <Text className="flex-1 text-gray-900 ml-10">${cat.budget.toFixed(2)}</Text>

                            {/* Actions */}
                            <View className="flex-1 flex-row justify-end space-x-4">
                                <TouchableOpacity>
                                    <PencilIcon size={18} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <TrashIcon size={18} color="#dc2626" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>









            </Card>


        </View>
    )

}