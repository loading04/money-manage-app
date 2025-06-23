import { Card } from "@/components/ui/card";
import { Dimensions, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
export default function Budgets() {
    const chartData = [
        { name: 'Housing', amount: 1000, color: '#3B82F6', legendFontColor: '#000', legendFontSize: 12 },
        { name: 'Food', amount: 600, color: '#22C55E', legendFontColor: '#000', legendFontSize: 12 },
        { name: 'Transportation', amount: 300, color: '#FACC15', legendFontColor: '#000', legendFontSize: 12 },
        { name: 'Entertainment', amount: 150, color: '#A855F7', legendFontColor: '#000', legendFontSize: 12 },
        { name: 'Utilities', amount: 180, color: '#EF4444', legendFontColor: '#000', legendFontSize: 12 },
    ];

    const screenWidth = Dimensions.get('window').width;

    return (
        <View className="bg-white-300 mt-4">
            <Card size="md" variant="outline" className="mb-4 m-4 shadow-sm bg-white">
                {/* Title */}
                <Text className="text-xl font-semibold mb-5">Budget Overview</Text>

                {/* Total */}
                <View className="items-center mb-4">
                    <Text className="text-4xl font-bold text-black">
                        $2,230.00 <Text className="text-xl text-gray-400">/ $2,450.00</Text>
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">Total Budget Spent</Text>
                </View>



                {/* Donut Chart */}
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

                {/* Legend */}
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
        </View>
    );
}