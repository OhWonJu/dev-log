"use client";

import { cn } from "@/lib/utils";
import { useSearch } from "@/store/useSearchStore";
import { SearchIcon } from "lucide-react";
import React from "react";

const Searchbar = () => {
  const search = useSearch();

  const searchClickHandler = () => {
    search.onOpen();
  };

  return (
    <div
      role="button"
      onClick={searchClickHandler}
      className={cn(
        "flex group min-h-[27px] text-sm py-2 px-3 rounded-md items-center shadow-sm text-muted-foreground font-medium border bg-background"
      )}
    >
      <SearchIcon className="w-4 h-4 mr-1 " />
      <span className="mr-4">Search Recipe</span>
      <kbd className="pointer-events-none inline-flex select-none items-center gap-1 rounded font-mono text-[10px] font-medium opacity-100">
        <span className="text-xs">cmd</span>k
      </kbd>
    </div>
  );
};

export default Searchbar;
