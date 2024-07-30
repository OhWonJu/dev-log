"use client";

import { Card } from "@/app/(blog)/_components";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Series } from "prisma/prisma-client";
import React from "react";

const CoursePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-serieses"],
    queryFn: async () => await axios.get("/api/series?simple"),
  });
  const seriesList = data?.data as Series[];

  return (
    <section className="flex flex-col mb-24">
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
          seriesList?.map((series: Series) => (
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
