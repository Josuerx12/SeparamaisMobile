import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";
import { useFilterReq } from "../../../hooks/useFilterRequests";
import { useRequests } from "../../../hooks/useRequests";
import RequestCard from "../../../components/cards/requestCard";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <View className="w-full flex-col mx-auto">
      {collectedReq && collectedReq.length > 0 ? (
        <FlatList
          className="py-5"
          data={collectedReq}
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

export default CollectedScreen;
