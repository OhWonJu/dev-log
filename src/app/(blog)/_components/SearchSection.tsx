"use client";

import React, { Fragment } from "react";

import { Document } from "prisma/prisma-client";
import { Card, Header } from "@/app/(blog)/_components";
import { ServerCrash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RecipesSection = () => {
  const searchParams = useSearchParams();

  const keyword = searchParams?.get("keyword");

  const { data, status, isLoading } = useQuery({
    queryKey: ["search", keyword ?? ""],
    queryFn: async () => await axios.get(`/api/search?keyword=${keyword}`),
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
        wrapperClassName="mb-16"
        searchable={false}
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
