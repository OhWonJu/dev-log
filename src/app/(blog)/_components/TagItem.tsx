import React from "react";

interface TagItemProps {
  id: string;
  tagName: string;
}

const TagItem = ({ id, tagName }: TagItemProps) => {
  return (
    <div role="button" className="grid items-center px-[10px] py-1 rounded-full border bg-background shadow-sm hover:bg-primary-foreground">
      <span className="text-sm text-primary font-semibold" >
        {tagName}
        </span>
    </div>
  );
};

export default TagItem;
