import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useCallback } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useRequests } from "../../../hooks/useRequests";
import { reqStatus } from "../../../constants/requestsStatus";
import RequestCard from "../../../components/cards/requestCard";
import { useFocusEffect } from "@react-navigation/native";

const NewRequests = () => {
  const { fetchRequestsWithFilters } = useRequests();

  const {
    data,
    hasNextPage,
    isFetching,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["newRequestsAlmox"],
    async ({ pageParam = 1 }) => {
      const res = await fetchRequestsWithFilters({
        itemsPerPage: 10,
        page: pageParam,
        status: reqStatus.nova,
      });

      return {
        totalPages: res.totalPages,
        request: res.requests,
        nextPage: pageParam + 1,
      };
    },
    {
      getNextPageParam: (data, pages) => {
        if (data.nextPage <= data.totalPages) {
          return data.nextPage;
        }
        return undefined;
      },
    }
  );

  const query = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("newRequestsAlmox");
    }, [query])
  );

  return (
    <View className="w-full flex-col mx-auto">
      {isFetching && (
        <ActivityIndicator className="py-5" color={"#999"} size={"large"} />
      )}
      {data && data.pages.flatMap(({ request }) => request).length > 0 ? (
        <FlatList
          className="py-5"
          data={data.pages.flatMap(({ request }) => request)}
          renderItem={({ item }) => <RequestCard req={item} key={item._id} />}
          keyExtractor={(item) => item._id}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null
          }
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
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

export default NewRequests;
