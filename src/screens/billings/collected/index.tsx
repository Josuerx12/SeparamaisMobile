import { View, Text, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFilterBillings } from "../../../hooks/useFilterBillings";
import { useFocusEffect } from "@react-navigation/native";
import { useBillings } from "../../../hooks/useBillings";
import { useQuery, useQueryClient } from "react-query";
import BillingCard from "../../../components/cards/billingCard";

const CollectedBillingsScreen = () => {
  const query = useQueryClient();
  const { fetchBillings } = useBillings();
  const { data, isLoading } = useQuery("userBillings", fetchBillings);

  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("userBillings");
    }, [query])
  );

  const { collectedBillings } = useFilterBillings(data);

  return (
    <ScrollView className="mb-14 mt-5">
      <View className="w-full flex-col mx-auto">
        {collectedBillings && collectedBillings.length > 0 ? (
          collectedBillings.map((bil) => {
            return <BillingCard key={bil.id} billing={bil} />;
          })
        ) : (
          <Text className="text-center text-lg">
            Nenhuma solicitação nesse status encontrada!
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default CollectedBillingsScreen;
