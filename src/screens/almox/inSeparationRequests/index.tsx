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

const InSeparationRequests = () => {
  const { fetchRequestsWithFilters } = useRequests();

  const {
    data,
    isFetching,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["inSeparationRequestsAlmox"],
    async ({ pageParam = 1 }) => {
      const res = await fetchRequestsWithFilters({
        page: pageParam,
        itemsPerPage: 10,
        status: reqStatus.emSeparacao,
      });

      return {
        totalPage: res.totalPages,
        nextPage: pageParam + 1,
        requests: res.requests,
      };
    },
    {
      getNextPageParam: (res, page) => {
        if (res.nextPage <= res.totalPage) {
          return res.nextPage;
        }
        return undefined;
      },
    }
  );

  const query = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("inSeparationRequestsAlmox");
    }, [query])
  );

  return (
    <View className="w-full flex-col mx-auto">
      {isFetching && (
        <ActivityIndicator className="py-5" color={"#999"} size={"large"} />
      )}
      {data && data.pages.flatMap(({ requests }) => requests).length > 0 ? (
        <FlatList
          className="py-5"
          data={data.pages.flatMap(({ requests }) => requests)}
          renderItem={({ item }) => <RequestCard req={item} key={item._id} />}
          keyExtractor={(item) => item._id}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={2}
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

export default InSeparationRequests;
