import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from 'react-native'; // ← add ScrollView
import { PieChart } from 'react-native-chart-kit';
import { Bar } from 'react-native-progress';
import { Category, getAllCategories } from "../db";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
export default function Budgets() {
    const screenWidth = Dimensions.get('window').width;
    const [categories, setCategories] = useState<Category[]>([]);

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                const data = await getAllCategories();
                setCategories(data);
            };
            loadData();
        }, [])
    );

    const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
    const totalSpent = categories.reduce((sum, cat) => sum + (cat.budget - cat.remainingBudget), 0);

    const chartData = categories.map((cat) => ({
        name: cat.name,
        amount: cat.budget - cat.remainingBudget,
        color: cat.color,
        legendFontColor: '#000',
        legendFontSize: 12
    }));

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="bg-white-300 mt-4">
                <Card size="md" variant="outline" className="mb-4 m-4 shadow-sm bg-white">
                    <Text className="text-xl font-semibold mb-5">Budget Overview</Text>

                    <View className="items-center mb-4">
                        <Text className="text-4xl font-bold text-black">
                            {totalSpent.toFixed(2)}{' '}
                            <Text className="text-xl text-gray-400">/ {totalBudget.toFixed(2)}</Text>
                        </Text>
                        <Text className="text-sm text-gray-500 mt-1">Total Budget Spent</Text>
                    </View>

                    <PieChart
                        data={chartData}
                        width={screenWidth - 40}
                        height={220}
                        chartConfig={{
                            color: () => `#000`,
                        }}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="100"
                        center={[0, 0]}
                        absolute
                        hasLegend={false}
                    />

                    <View className="mt-4 space-y-1">
                        <View className="flex-row flex-wrap justify-center gap-2">
                            {chartData.map((item, idx) => (
                                <View key={idx} className="flex-row items-center mr-4 mb-1">
                                    <View className="w-3 h-3 rounded-sm mr-1" style={{ backgroundColor: item.color }} />
                                    <Text className="text-sm text-gray-700">{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </Card>

                {categories.map((cat) => {
                    const spent = cat.budget - cat.remainingBudget;
                    const percentageSpent = Math.min(spent / cat.budget, 1);

                    return (
                        <View
                            key={cat.id}
                            className="bg-white p-4 rounded-xl shadow border border-gray-200 my-3 m-4"
                        >
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-lg font-semibold text-gray-900">{cat.name}</Text>
                                <Text className="text-sm font-semibold text-red-600">
                                    {(percentageSpent * 100).toFixed(0)}%
                                </Text>
                            </View>

                            <Bar
                                progress={percentageSpent}
                                width={null}
                                color={cat.color}
                                unfilledColor="#E5E7EB"
                                borderWidth={0}
                                height={10}
                                borderRadius={5}
                                style={{ marginBottom: 10 }}
                            />

                            <View className="flex-row justify-between mb-1">
                                <Text className="text-sm font-medium text-gray-900">
                                    {spent.toFixed(2)} spent
                                </Text>
                                <Text className="text-sm font-medium text-blue-600">
                                    {cat.remainingBudget.toFixed(2)} remaining
                                </Text>
                            </View>

                            <Text className="text-xs text-gray-500">
                                Budget: {cat.budget.toFixed(2)}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}
