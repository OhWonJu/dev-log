"use client";

import React, { Fragment, useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";

import usePostQuery from "@/hooks/usePostQuery";
import { Document } from "prisma/prisma-client";
import { Card, Header } from "@/app/(blog)/_components";
import { ServerCrash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

const HEADER_MAP = {
  pinned: "Signature Recipes",
  recent: "Recent Recipes",
};

const RecipesSection = () => {
  const searchParams = useSearchParams();

  const type = searchParams?.get("type") as "recent" | "pinned";

  const { isIntersecting, ref: bottomRef } = useIntersectionObserver({
    rootMargin: "20%",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = usePostQuery({
    queryKey: ["posts", type],
    apiUrl: "/api/documents",
    paramKey: "type",
    paramValue: type,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isIntersecting]);

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Somthing went wrong!
        </p>
      </div>
    );
  }
  return (
    <section className="flex flex-col p-8 lg:p-0 mb-24">
      <Header
        title={HEADER_MAP[type]}
        titleClassName="text-5xl"
        wrapperClassName="mb-16"
      />
      <div className="flex-1 grid md:grid-cols-3 lg:grid-cols-4 gap-3 h-full">
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                className="rounded-lg w-full aspect-[3/2] md:aspect-[3/4]"
              />
            ))}
        {!isLoading &&
          data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.items.map((post: Document) => (
                <Card
                  key={post.id}
                  id={post.id}
                  cardType="post"
                  title={post.title}
                  coverImage={post.coverImage}
                  createdAt={post.createdAt}
                />
              ))}
            </Fragment>
          ))}
      </div>
      <div ref={bottomRef} />
    </section>
  );
};

export default RecipesSection;
