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

const WaitingForCollect = () => {
  const { filters } = useFilterRequests();

  const {
    data,
    hasNextPage,
    isFetching,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchWithFiltersUseInfiniteQuery(filters, reqStatus.aguardandoColeta);

  const query = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      query.invalidateQueries("waitingForCollectAlmox");
    }, [query])
  );

  useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <View className="w-full flex-col mx-auto">
      {data && data.pages.flatMap(({ requests }) => requests).length > 0 ? (
        <FlatList
          className="py-5"
          data={data.pages.flatMap(({ requests }) => requests)}
          renderItem={({ item }) => <RequestCard req={item} key={item._id} />}
          keyExtractor={(item) => item._id}
          onEndReached={() => {
            if (hasNextPage) {
              return fetchNextPage;
            }
            return undefined;
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

export default WaitingForCollect;
