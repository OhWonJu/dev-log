"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Document } from "prisma/prisma-client";
import { ServerCrash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";

import { Card, Header } from "@/app/(blog)/_components";

const RecipesSection = () => {
  const searchParams = useSearchParams();

  const keyword = searchParams?.get("keyword");
  const tags = searchParams?.get("tags");

  const { data, status, isLoading } = useQuery({
    queryKey: ["search", keyword, tags],
    queryFn: async () =>
      await axios.get(`/api/search?keyword=${keyword}&tags=${tags}`),
  });
  const documents = data?.data as Document[];

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
        title={"Search"}
        titleClassName="text-5xl"
        wrapperClassName="mb-4"
        searchable={false}
      />
      <span className="text-sm font-semibold text-zinc-400 dark:text-zinc-600 mb-16">
        Result of Searching with {keyword || tags?.split("-").join(", ")}
      </span>
      <div className="flex-1 grid md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-3 h-full">
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                className="rounded-lg w-full aspect-[3/2] md:aspect-[3/4]"
              />
            ))}
        {documents?.length === 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            검색 결과가 없습니다.
          </p>
        )}
        {!isLoading &&
          documents?.map((post: Document) => (
            <Card
              key={post.id}
              id={post.id}
              cardType="post"
              title={post.title}
              coverImage={post.coverImage}
              createdAt={post.createdAt}
            />
          ))}
      </div>
    </section>
  );
};

export default RecipesSection;
