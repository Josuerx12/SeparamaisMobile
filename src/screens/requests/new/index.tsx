import { View, Text, ScrollView, FlatList } from "react-native";
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
    <View className="w-full flex-col mx-auto">
      {newReq && newReq.length > 0 ? (
        <FlatList
          className="py-5"
          data={newReq}
          renderItem={({ item }) => <RequestCard req={item} key={item._id} />}
        />
      ) : (
        <Text className="text-center text-lg">
          Nenhuma solicitação nesse status encontrada!
        </Text>
      )}
    </View>
  );
};

export default NewRequestScreen;
