import React from "react";
import dynamicImport from "next/dynamic";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import qs from "query-string";

import { getQueryClient } from "@/lib/getQueryClient";
import { env } from "@/lib/env";

import LoadingPage from "./loading";

export const dynamic = "force-dynamic";

const BlogTabViewWrapper = dynamicImport(
  () => import("../../../_components/BlogTabViewWrapper"),
  {
    ssr: false,
    loading: () => <LoadingPage />,
  }
);

const RecipesSection = dynamicImport(
  () => import("../../../_components/RecipesSection")
);

const CoursesSection = dynamicImport(
  () => import("../../../_components/CoursesSection")
);

const TAB_VIEWS = [
  <RecipesSection key="recent" type="recent" />,
  <RecipesSection key="pinned" type="pinned" />,
  <CoursesSection key="courses" />,
];

const fetchData = async (url: string) => {
  const res = await fetch(url, {
    cache: "force-cache",
    next: { tags: ["blog"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const BlogPage = async () => {
  const queryClient = getQueryClient();

  const apiUrl = `${env.SITE_URL}/api`;

  const fetchPost = async ({ type }: { type: "recent" | "pinned" }) => {
    const url = qs.stringifyUrl({
      url: `${apiUrl}/documents`,
      query: {
        type,
      },
    });

    const result = await fetchData(url);
    return result;
  };

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["posts", "recent"],
      queryFn: async () =>
        await fetchPost({
          type: "recent",
        }),
      getNextPageParam: (lastPage: any) => lastPage?.nextCursor,
      initialPageParam: undefined,
    }),

    queryClient.prefetchInfiniteQuery({
      queryKey: ["posts", "pinned"],
      queryFn: async () =>
        await fetchPost({
          type: "pinned",
        }),
      getNextPageParam: (lastPage: any) => lastPage?.nextCursor,
      initialPageParam: undefined,
    }),

    queryClient.prefetchQuery({
      queryKey: ["all-serieses"],
      queryFn: async () => {
        const result = await fetchData(`${apiUrl}/series?simple`);

        return result;
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogTabViewWrapper tabViews={TAB_VIEWS} />
    </HydrationBoundary>
  );
};

export default BlogPage;
