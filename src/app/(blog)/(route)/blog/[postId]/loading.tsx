import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="w-full">
      <div className="space-y-4 md:pl-[56px] pt-[40px]">
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
        <Skeleton className="h-16 w-[60%] sm:w-[30%]" />
        <Skeleton className="h-6 w-[100%] sm:w-[50%]" />
        <Skeleton className="h-6 w-[80%] sm:w-[40%]" />
        <Skeleton className="h-6 w-[100%] sm:w-[50%]" />
        <Skeleton className="h-6 w-[60%] sm:w-[60%]" />
        <Skeleton className="h-6 w-[80%] sm:w-[40%]" />
        <Skeleton className="h-6 w-[40%] sm:w-[20%]" />
      </div>
    </div>
  );
};

export default LoadingPage;
