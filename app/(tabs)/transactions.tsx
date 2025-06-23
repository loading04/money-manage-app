import { Card } from "@/components/ui/card";
import { PencilIcon, ShoppingBag, TrashIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
export default function Transactions() {
    return (
        <View className="bg-white-300 mt-4">
            <Card size="md" variant="outline" className="mb-4 m-4 shadow-sm bg-white">
                <View className="flex-row justify-between items-center px-4 py-2 mb-5">
                    <Text className="text-2xl font-semibold">Recent Transactions</Text>
                    <TouchableOpacity className="bg-blue-400 rounded-md px-3 py-1">
                        <Text className="text-white font-semibold">+ Add Transaction</Text>
                    </TouchableOpacity>
                </View>


                {/* transaction line */}
                <View className="flex-row justify-between items-center px-4 py-3 bg-white rounded-lg drop-shadow-sm mb-2">
                    {/* Left: Icon + Info */}
                    <View className="flex-row items-center">
                        {/* Icon circle */}
                        <View className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center mr-3">
                            <ShoppingBag size={18} color="#000" />
                        </View>

                        {/* Title and Date */}
                        <View>
                            <Text className="text-base font-semibold">Grocery Shopping</Text>
                            <Text className="text-sm text-gray-500">May 12</Text>
                        </View>
                    </View>

                    {/* Right: Category + Amount + Actions */}
                    <View className="flex-row items-center space-x-2">
                        {/* Badge */}
                        <Text className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">Food</Text>

                        {/* Amount */}
                        <Text className="text-base text-red-600 font-semibold">- $120.50</Text>

                        {/* Edit icon */}
                        <TouchableOpacity>
                            <PencilIcon size={18} color="#000" />
                        </TouchableOpacity>

                        {/* Delete icon */}
                        <TouchableOpacity>
                            <TrashIcon size={18} color="#dc2626" />
                        </TouchableOpacity>
                    </View>
                </View>


            </Card>

        </View>
    )

}