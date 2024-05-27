import { View, Text, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BillingCard from "../../../components/cards/billingCard";
import { useFilterBillings } from "../../../hooks/useFilterBillings";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";
import { useBillings } from "../../../hooks/useBillings";

const InQuarantineBillingsScreen = () => {
  const query = useQueryClient();
  const { fetchBillings } = useBillings();
  const { data, isLoading } = useQuery("userBillings", fetchBillings);

  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("userBillings");
    }, [query])
  );

  const { inQuarantineBillings } = useFilterBillings(data);

  return (
    <ScrollView className="mb-14 mt-5">
      <View className="w-full flex-col mx-auto">
        {inQuarantineBillings && inQuarantineBillings.length > 0 ? (
          inQuarantineBillings.map((bil) => {
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

export default InQuarantineBillingsScreen;
