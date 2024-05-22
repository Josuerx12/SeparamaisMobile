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
    <ScrollView>
      <View className="w-full flex-col pt-8 gap-y-4 mx-auto">
        {newReq?.map((req) => {
          return <RequestCard key={req._id} req={req} />;
        })}
      </View>
    </ScrollView>
  );
};

export default NewRequestScreen;
