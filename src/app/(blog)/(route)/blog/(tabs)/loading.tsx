import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingPage = () => {
  return (
    <section className="flex flex-col mb-24">
      <div className="flex-1 grid md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-3 h-full">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Skeleton
              key={i}
              className="rounded-lg w-full aspect-[3/2] md:aspect-[3/4]"
            />
          ))}
      </div>
    </section>
  );
};

export default LoadingPage;
