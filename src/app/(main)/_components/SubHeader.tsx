import { cn } from "@/lib/utils";
import React from "react";

const SubHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h2 className={cn("font-semibold text-4xl mb-14 text-center", className)}>
      {children}
    </h2>
  );
};

export default SubHeader;
