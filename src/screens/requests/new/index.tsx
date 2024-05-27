import { View, Text, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRequests } from "../../../hooks/useRequests";
import { useFilterReq } from "../../../hooks/useFilterRequests";
import RequestCard from "../../../components/cards/requestCard";
import { useFocusEffect } from "@react-navigation/native";

const NewRequestScreen = () => {
  const { fetchUserRequests } = useRequests();

  const { data, isLoading } = useQuery(["userRequests"], fetchUserRequests);

  const { newReq } = useFilterReq(data);
  const query = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("userRequests");
    }, [query])
  );

  return (
    <ScrollView className="mt-4">
      <View className="w-full flex-col  mx-auto">
        {newReq && newReq.length > 0 ? (
          newReq.map((req) => {
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

export default NewRequestScreen;
