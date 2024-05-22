import { View, Text, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";
import { useFilterReq } from "../../../hooks/useFilterRequests";
import { useRequests } from "../../../hooks/useRequests";
import RequestCard from "../../../components/cards/requestCard";

const CollectedScreen = () => {
  const { fetchUserRequests } = useRequests();

  const { data, isLoading } = useQuery(["userRequests"], fetchUserRequests);

  const { collectedReq } = useFilterReq(data);

  const query = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("userRequests");
    }, [query])
  );
  return (
    <ScrollView>
      <View className="w-full flex-col mx-auto">
        {collectedReq && collectedReq.length > 0 ? (
          collectedReq.map((req) => {
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

export default CollectedScreen;
