"use client";

import { Tag } from "prisma/prisma-client";
import React, { useState } from "react";

import TagItem from "./TagItem";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TagsProps {
  tags: Tag[];
}

const Tags = ({ tags }: TagsProps) => {
  const router = useRouter();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags((prev) => [...prev, tagName]);
    }
  };

  const onSearch = () => {
    const tags = selectedTags.join('-');
    router.push(`/blog/search?tags=${tags}`);
  };

  return (
    <aside className="flex flex-col lg:flex-1 lg:items-center">
      <h2 className="text-4xl font-bold text-zinc-600 dark:text-zinc-300 mb-6">
        Ingredients
      </h2>
      <div className="flex flex-col lg:w-full border bg-background rounded-md shadow-md px-4 py-3">
        <span className="font-semibold text-xs text-zinc-400 dark:text-zinc-600">
          Search by Ingredients
        </span>
        <div className="flex flex-wrap py-3 gap-x-1 gap-y-2">
          {tags.map((tag) => (
            <TagItem
              key={tag.id}
              id={tag.id}
              tagName={tag.tagName}
              isSelected={!!selectedTags.find((t) => t === tag.tagName)}
              onTagClick={handleTagClick}
            />
          ))}
        </div>
        <div className="w-full py-3">
          {selectedTags.length > 0 && (
            <Button variant={"outline"} onClick={onSearch} className="w-full">
              Search
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Tags;
