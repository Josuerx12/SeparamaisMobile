import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useRequests } from "../../../hooks/useRequests";
import { reqStatus } from "../../../constants/requestsStatus";
import RequestCard from "../../../components/cards/requestCard";
import { useFocusEffect } from "@react-navigation/native";
import { useFetchWithFiltersUseInfiniteQuery } from "../../../hooks/useFetchWithFiltersUseInfiniteQuery";
import { useFilterRequests } from "../../../contexts/FilterContext";

const CollectedRequests = () => {
  const { filters } = useFilterRequests();

  const {
    data,
    fetchNextPage,
    isFetching,
    refetch,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchWithFiltersUseInfiniteQuery(filters, reqStatus.coletado);

  const query = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries(("almoxRequests" + reqStatus.coletado).trim());
    }, [query])
  );

  useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <View className="w-full flex-col mx-auto">
      {data && data.pages.length > 0 ? (
        <FlatList
          className="py-5"
          data={data.pages.flatMap((e) => e.requests)}
          renderItem={({ item }) => <RequestCard req={item} key={item._id} />}
          keyExtractor={(item) => item._id}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={2}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null
          }
        />
      ) : (
        <Text className="text-center text-lg">
          Nenhuma solicitação nesse status encontrada!
        </Text>
      )}
    </View>
  );
};

export default CollectedRequests;
