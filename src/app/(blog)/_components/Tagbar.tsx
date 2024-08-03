"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Tag } from "prisma/prisma-client";

import { cn } from "@/lib/utils";

import TagItem from "./TagItem";
import { useScrollReached } from "@/hooks/useScrollReached";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

const THRESHOLD = 50;

interface TagbarProps {
  tagData: Tag[];
}

const Tagbar = ({ tagData }: TagbarProps) => {
  const router = useRouter();

  const tagbarRef = useRef<HTMLDivElement>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { isOverflowed, isReached } = useScrollReached({
    ref: tagbarRef,
    direction: "horizontal",
    threshold: THRESHOLD,
  });
  const isGrabbing = useHorizontalScroll(tagbarRef);

  const handleTagClick = (tagName: string) => {
    if (isGrabbing) return;

    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags((prev) => [...prev, tagName]);
    }
  };

  const onSearch = () => {
    const tags = selectedTags.join("-");
    router.push(`/blog/search?tags=${tags}`);
  };

  return (
    <div className="relative mb-10 py-2 flex justify-between">
      <button
        role="button"
        onClick={onSearch}
        disabled={selectedTags.length < 1}
        className={cn(
          "grid items-center justify-center w-[130px] py-2 rounded-full border text-sm shadow-sm font-semibold text-primary",
          selectedTags.length < 1 &&
            "bg-zinc-100 dark:bg-zinc-700 text-primary",
          selectedTags.length > 0 && "bg-white text-black font-medium text-xs"
        )}
      >
        <span>
          {selectedTags.length > 0 ? "searching by tags" : "🍽️ Ingredients"}
        </span>
      </button>
      <div className="flex w-[83%]">
        <div
          ref={tagbarRef}
          className="flex w-full gap-x-2 whitespace-nowrap  overflow-x-scroll scrollbar-hide pr-20"
        >
          {tagData.map((tag) => (
            <TagItem
              key={tag.id}
              tagName={tag.tagName}
              isSelected={!!selectedTags.find((t) => t === tag.tagName)}
              onTagClick={handleTagClick}
            />
          ))}
        </div>
      </div>
      <div
        className={cn(
          "absolute flex h-full flex-row-reverse w-[1px] right-0 top-1/2 -translate-y-1/2 p-2 px-10 bg-gradient-to-l from-background to-background/0 transition-opacity",
          isOverflowed && !isReached ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default Tagbar;
