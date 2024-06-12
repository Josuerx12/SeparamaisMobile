import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useCallback } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useRequests } from "../../../hooks/useRequests";
import { reqStatus } from "../../../constants/requestsStatus";
import RequestCard from "../../../components/cards/requestCard";
import { useFocusEffect } from "@react-navigation/native";

const CollectedRequests = () => {
  const { fetchRequestsWithFilters } = useRequests();

  const {
    data,
    fetchNextPage,
    isFetching,
    refetch,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["collectedRequests"],
    async ({ pageParam = 1 }) => {
      const res = await fetchRequestsWithFilters({
        page: pageParam,
        itemsPerPage: 10,
        status: reqStatus.coletado,
      });

      return {
        requests: res.requests,
        nextPage: pageParam + 1,
        totalPages: res.totalPages,
      };
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage <= lastPage.totalPages) {
          return lastPage.nextPage;
        }
        return undefined;
      },
    }
  );

  const query = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("collectedRequests");
    }, [query])
  );

  return (
    <View className="w-full flex-col mx-auto">
      {isFetching && (
        <ActivityIndicator className="py-5" color={"#999"} size={"large"} />
      )}
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
