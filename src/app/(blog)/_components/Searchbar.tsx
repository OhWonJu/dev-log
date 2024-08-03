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
        "text-xs text-muted-foreground font-medium rounded-full bg-zinc-100 dark:bg-zinc-700 shadow-inner"
      )}
    >
      <div className="searchbar hidden md:flex items-center group py-3 px-3">
        <SearchIcon className="w-4 h-4 mr-2 text-primary stroke-[3px]" />
        <span className="mr-4">Search Recipes ...</span>
        <kbd className="ml-auto pointer-events-none inline-flex select-none items-center gap-1 rounded font-mono text-[10px] font-medium opacity-40">
          <span className="text-xs">cmd</span>k
        </kbd>
      </div>

      <div className="search_button md:hidden flex items-center p-2">
        <SearchIcon className="w-4 h-4 text-primary stroke-[3px]" />
      </div>
    </div>
  );
};

export default Searchbar;
