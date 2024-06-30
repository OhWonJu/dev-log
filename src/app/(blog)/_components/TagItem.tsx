import React from "react";

import { cn } from "@/lib/utils";

interface TagItemProps {
  id: string;
  tagName: string;
  isSelected: boolean;
  onTagClick: (tagName: string) => void;
}

const TagItem = ({ id, tagName, isSelected, onTagClick }: TagItemProps) => {
  return (
    <div
      role="button"
      onClick={() => onTagClick(tagName)}
      className={cn(
        "grid items-center px-[10px] py-1 rounded-full border shadow-sm font-semibold",
        isSelected && "bg-symbol-500 text-white border-transparent",
        !isSelected && "bg-background hover:bg-primary-foreground text-primary"
      )}
    >
      <span className="text-sm">{tagName}</span>
    </div>
  );
};

export default TagItem;
