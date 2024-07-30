import React from "react";

import { cn } from "@/lib/utils";

interface SymbolProps {
  title: string;
  wrapperClassName?: string;
  titleClassName?: string;
}

const Symbol = ({ title, wrapperClassName, titleClassName }: SymbolProps) => {
  return (
    <header
      className={cn(
        "flex flex-col sm:flex-row w-full justify-between sm:items-center gap-y-16 sm:gap-y-0 mt-10 mb-10",
        wrapperClassName
      )}
    >
      <h1
        role="heading"
        className={cn("font-Pacifico text-symbol-500 text-7xl", titleClassName)}
      >
        {title}
      </h1>
    </header>
  );
};

export default Symbol;
