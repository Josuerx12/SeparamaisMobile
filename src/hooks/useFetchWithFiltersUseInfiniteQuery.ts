import { useInfiniteQuery } from "react-query";
import { FilterRequestProps } from "../contexts/FilterContext";
import { useRequests } from "./useRequests";

export function useFetchWithFiltersUseInfiniteQuery(
  filters: FilterRequestProps,
  status: string
) {
  const { fetchRequestsWithFilters } = useRequests();

  return useInfiniteQuery(
    ["almoxRequests" + status.trim()],
    async ({ pageParam = 1 }) => {
      const res = await fetchRequestsWithFilters({
        page: pageParam,
        itemsPerPage: 10,
        status: status,
        exitID: filters.exitID,
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
}
