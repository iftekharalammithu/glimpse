import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";

export const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  const { data, isPending, isFetched, refetch, isFetching } = useQuery({
    // usequery help us to get api call with query key
    // the key is cache and i can use that cache data by query key
    queryKey,
    queryFn,
    enabled,
  });
  return { data, isPending, isFetched, refetch, isFetching };
};
