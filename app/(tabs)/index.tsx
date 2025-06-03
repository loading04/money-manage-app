import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react-native";
import { Text, View } from "react-native";
import { COLORS } from '../constants/theme';
export default function Index() {
  const totalBalance = 4750.75;
  return (
    <View className="bg-white-300 mt-4">
      {/* Total Balance Card */}
      <Card size="md" variant="outline" className="mb-4 m-4">
        <Heading size="md" className="mb-1 pt-4 pl-4 text-2xl font-semibold" >
          Total Balance
        </Heading>
        <Text className="font-bold color-gray-950 text-4xl pl-4"  >
          ${totalBalance}
        </Text>
      </Card>

      {/* Income & Expenses Side by Side */}
      <HStack space="lg">
        {/* Income Card */}
        <Card
          size="md"
          variant="outline"
          className="flex-1 mr-2 m-4"
        >

          <HStack space="4xl">
            <View className="bg-green-200 rounded-full w-10 h-10 items-center justify-center mt-3----------------------" >
              <TrendingUp className="h-5 w-5" color={COLORS.green} />
            </View>

            <VStack>
              <Heading size="sm" className="mb-1 dark:text-stone-500">
                Income
              </Heading>

              <Text className="text-xl color-black font-semibold" >
                $3,200.00
              </Text>
            </VStack>
          </HStack>
        </Card>

        {/* Expenses Card */}
        <Card
          size="md"
          variant="outline"
          className="flex-1 mr-2 m-4"
        >

          <HStack space="4xl">
            <View className="bg-red-200 rounded-full w-10 h-10 items-center justify-center mt-3----------------------" >
              <TrendingDown className="h-5 w-5" color={COLORS.red} />
            </View>

            <VStack>
              <Heading size="sm" className="mb-1 dark:text-stone-500">
                Expenses
              </Heading>

              <Text className="text-xl color-black font-semibold" >
                $1,200.00
              </Text>
            </VStack>
          </HStack>
        </Card>
      </HStack>

      <HStack space="lg">
        {/* Income Card */}
        <Card
          size="md"
          variant="outline"
          className="flex-1 mr-2 m-4"
        >

          <HStack space="4xl">
            <View className="bg-blue-200 rounded-full w-10 h-10 items-center justify-center mt-3----------------------" >
              <Wallet className="h-5 w-5" color={COLORS.blue} />
            </View>

            <VStack>
              <Heading size="sm" className="mb-1 dark:text-stone-500">
                Monthly Budget
              </Heading>

              <Text className="text-xl color-black font-semibold" >
                $3,200.00
              </Text>
            </VStack>
          </HStack>
        </Card>

        {/* Expenses Card */}
        <Card
          size="md"
          variant="outline"
          className="flex-1 mr-2 m-4"
        >

          <HStack space="4xl">
            <View className="bg-purple-200 rounded-full w-10 h-10 items-center justify-center mt-3----------------------" >
              <PiggyBank className="h-5 w-5" color={COLORS.purple} />
            </View>

            <VStack>
              <Heading size="sm" className="mb-1 dark:text-stone-500">
                Saving
              </Heading>
              <Text className="text-xl color-black font-semibold" >
                $1,200.00
              </Text>
            </VStack>
          </HStack>
        </Card>
      </HStack>



      <Card size="md" variant="outline" className="mb-4 m-4">
        <Heading size="md" className="mb-1 pt-4 pl-4 text-2xl font-semibold" >
          Budget Progress
        </Heading>

        <HStack className="pl-4 pt-4">
          <Text className="text-xl font-semibold">
           Housing
          </Text>
          <Text className="absolute right-0 text-lg">
            $1,150.00 / $1,200.00
          </Text>
          
        </HStack>

        <View className="h-2  bg-gray-200 rounded-full overflow-hidden ml-4 mt-2">
          <View className="h-full bg-green-500 rounded-full  " style={{ width: '96%' }} />
        </View>
          
       

      </Card>

    </View>
  );
}