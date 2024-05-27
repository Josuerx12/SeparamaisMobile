import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useBillings } from "../../../hooks/useBillings";
import { useFocusEffect } from "@react-navigation/native";
import BillingCard from "../../../components/cards/billingCard";
import { useFilterBillings } from "../../../hooks/useFilterBillings";

const WaitingToCollectBillingsScreen = () => {
  const query = useQueryClient();
  const { fetchBillings } = useBillings();
  const { data, isLoading } = useQuery("userBillings", fetchBillings);

  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("userBillings");
    }, [query])
  );

  const { waitingToCollectBillings } = useFilterBillings(data);

  return (
    <ScrollView className="mb-14 mt-5">
      <View className="w-full flex-col mx-auto">
        {waitingToCollectBillings && waitingToCollectBillings.length > 0 ? (
          waitingToCollectBillings.map((bil) => {
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

export default WaitingToCollectBillingsScreen;
