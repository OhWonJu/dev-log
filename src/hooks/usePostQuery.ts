import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";

interface PostQueryProps {
  queryKey: string[];
  apiUrl: string;
  paramKey: "type";
  paramValue: "recent" | "pinned";
  initPageParam?: any;
}

const usePostQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
  initPageParam,
}: PostQueryProps) => {
  const fetchPosts = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true }
    );

    const res = await fetch(url);
    return res.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: initPageParam ? initPageParam : undefined,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  };
};

export default usePostQuery;
