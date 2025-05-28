import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { TrendingUp } from "lucide-react-native";
import { View } from "react-native";
import { COLORS } from '../constants/theme';

export default function Index() {
  const totalBalance = 4750.75;

  return (
    <View className="bg-white-300 mt-4">
      {/* Total Balance Card */}
      <Card size="md" variant="outline" className="mb-4 m-4">
        <Heading size="md" className="mb-1" bold>
          Total Balance
        </Heading>
        <Text bold className="font-bold" size="2xl">
          {totalBalance}
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

              <Text bold size="lg" >
                3,200.00
              </Text>
            </VStack>

          </HStack>



        </Card>

        {/* Expenses Card */}
        <Card
          size="md"
          variant="outline"
          className="flex-1 ml-2 m-4"
        >

          <Heading size="sm" className="mb-1 dark:text-stone-500">
            Expenses
          </Heading>
          <Text bold size="lg" >
            1,850.25
          </Text>

        </Card>
      </HStack>
    </View>
  );
}