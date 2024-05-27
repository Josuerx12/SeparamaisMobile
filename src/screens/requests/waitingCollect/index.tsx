import { View, Text, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { useFilterReq } from "../../../hooks/useFilterRequests";
import { useQuery, useQueryClient } from "react-query";
import { useRequests } from "../../../hooks/useRequests";
import { useFocusEffect } from "@react-navigation/native";
import RequestCard from "../../../components/cards/requestCard";

const WaitingCollectRequestScreen = () => {
  const { fetchUserRequests } = useRequests();

  const { data, isLoading } = useQuery(["userRequests"], fetchUserRequests);

  const { waitingToCollectReq } = useFilterReq(data);

  const query = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("userRequests");
    }, [query])
  );
  return (
    <ScrollView className="mt-4">
      <View className="w-full  flex-col  mx-auto">
        {waitingToCollectReq && waitingToCollectReq.length > 0 ? (
          waitingToCollectReq.map((req) => {
            return <RequestCard key={req._id} req={req} />;
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

export default WaitingCollectRequestScreen;
