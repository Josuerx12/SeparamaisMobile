import { useQuery } from "react-query";
import { FilterRequestProps } from "../contexts/FilterContext";
import { useRequests } from "./useRequests";

export function useFetchQueryWithFilters(
  filters: FilterRequestProps,
  status: string
) {
  const { fetchRequestsWithFilters } = useRequests();

  return useQuery(["almoxRequests" + status.trim()], async () => {
    const res = await fetchRequestsWithFilters({
      page: 1,
      itemsPerPage: 100,
      status: status,
      exitID: filters.exitID,
      startAt: filters.startAt,
      endAt: filters.endAt,
    });

    return res.requests;
  });
}
