"use client";

import React, { Fragment } from "react";
import { useSearchParams } from "next/navigation";

import usePostQuery from "@/hooks/usePostQuery";
import { Document, Series } from "prisma/prisma-client";
import { Card } from "@/app/(blog)/_components";
import { ServerCrash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const HEADER_MAP = {
  pinned: "Pinned Recipes",
  recent: "Recent Recipes",
};

const CoursePage = () => {
  const searchParams = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["all-serieses"],
    queryFn: async () => await axios.get("/api/series?simple"),
  });
  const seriesList = data?.data as Series[];

  return (
    <section className="flex flex-col p-8 lg:p-0 mb-24">
      <h1
        role="banner"
        className="text-5xl font-bold text-zinc-600 dark:text-zinc-300 mr-4 mb-12"
      >
        Coures
      </h1>
      <div className="flex-1 grid md:grid-cols-3 lg:grid-cols-4 gap-3 h-full">
        {isLoading &&
          Array(8)
            .fill(0)
            .map((i) => (
              <Skeleton
                key={i}
                className="rounded-lg w-full aspect-[3/2] md:aspect-[3/4]"
              />
            ))}
        {seriesList?.map((series: Series) => (
          <Card
            key={series.id}
            id={series.id}
            cardType="series"
            title={series.name}
          />
        ))}
      </div>
    </section>
  );
};

export default CoursePage;
