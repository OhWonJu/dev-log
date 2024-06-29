import React from "react";

import { cn } from "@/lib/utils";

import Searchbar from "./Searchbar";

interface HeaderProps {
  title: string;
  wrapperClassName?: string;
  titleClassName?: string;
  searchable?: boolean;
}

const Header = ({
  title,
  wrapperClassName,
  titleClassName,
  searchable = true,
}: HeaderProps) => {
  return (
    <header
      className={cn(
        "flex w-full justify-between items-center mt-10 mb-20",
        wrapperClassName
      )}
    >
      <h1
        role="banner"
        className={cn("font-Pacifico text-symbol-500 text-7xl", titleClassName)}
      >
        {title}
      </h1>
      {searchable && <Searchbar />}
    </header>
  );
};

export default Header;
