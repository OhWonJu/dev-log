import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
      <div className="space-y-4 pl-[56px] pt-[40px]">
        <Skeleton className="title h-[3.75rem] w-[100%]" />
        <Skeleton className="createdAt h-4 w-[20%] mx-auto" />
        <div className="flex w-full justify-center gap-x-3">
          <Skeleton className="tags h-9 w-[10%] rounded-full" />
          <Skeleton className="tags h-9 w-[10%] rounded-full" />
          <Skeleton className="tags h-9 w-[10%] rounded-full" />
        </div>
        <div className="py-10">
          <Skeleton className="sperator h-1 w-[100%]" />
        </div>
        <Skeleton className="h-16 w-[30%]" />
        <Skeleton className="h-6 w-[50%]" />
        <Skeleton className="h-6 w-[40%]" />
        <Skeleton className="h-6 w-[50%]" />
        <Skeleton className="h-6 w-[60%]" />
        <Skeleton className="h-6 w-[40%]" />
        <Skeleton className="h-6 w-[20%]" />
      </div>
    </div>
  );
};

export default LoadingPage;
