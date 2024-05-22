import { SafeAreaView, View, Text, ScrollView } from "react-native";
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
    <ScrollView>
      <View className="w-full flex-col pt-8 gap-y-4 mx-auto">
        {inSeparationReq?.map((req) => {
          return <RequestCard key={req._id} req={req} />;
        })}
      </View>
    </ScrollView>
  );
};

export default InSeparationScreen;
