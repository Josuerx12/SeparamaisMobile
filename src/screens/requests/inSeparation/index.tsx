import { SafeAreaView, View, Text, ScrollView, FlatList } from "react-native";
import RequestCard from "../../../components/cards/requestCard";
import { useQuery, useQueryClient } from "react-query";
import { useRequests } from "../../../hooks/useRequests";
import { useFilterReq } from "../../../hooks/useFilterRequests";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const InSeparationScreen = () => {
  const { fetchUserRequests } = useRequests();

  const { data, isLoading } = useQuery(["userRequests"], fetchUserRequests);

  const { inSeparationReq } = useFilterReq(data);

  const query = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("userRequests");
    }, [query])
  );
  return (
    <View className="w-full flex-col mx-auto">
      {inSeparationReq && inSeparationReq.length > 0 ? (
        <FlatList
          className="py-5"
          data={inSeparationReq}
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

export default InSeparationScreen;
