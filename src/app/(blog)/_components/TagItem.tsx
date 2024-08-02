import React from "react";

import { cn } from "@/lib/utils";

interface TagItemProps {
  tagName: string;
  isSelected: boolean;
  onTagClick: (tagName: string) => void;
}

const TagItem = ({ tagName, isSelected, onTagClick }: TagItemProps) => {
  return (
    <div
      role="button"
      onClick={() => onTagClick(tagName)}
      className={cn(
        "grid items-center px-[10px] py-2 rounded-full border shadow-sm font-semibold snap-center snap-always",
        isSelected && "bg-symbol-500 text-white border-symbol-500",
        !isSelected && "bg-background hover:bg-primary-foreground text-primary"
      )}
    >
      <span className="text-sm">{tagName}</span>
    </div>
  );
};

export default TagItem;
