"use client";

import { DocumentWithTags } from "@/types";

import TitleInput from "./TitleInput";
import TagInput from "./TagInput";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface ToolbarProps {
  initialData: DocumentWithTags;
  onChange?: (target: "title" | "seriesId" | "newTags", value: any) => void;
  preview?: boolean;
}

const DATE_FORMAT = "yyyy.MM.dd";

const Toolbar = ({ initialData, onChange, preview }: ToolbarProps) => {
  return (
    <div className="py-8 mb-8 px-[54px] group relative gap-y-4 md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto border-b ">
      {/* Title */}
      <TitleInput
        initialTitle={initialData.title}
        preview={preview}
        onChange={onChange}
      />
      <div className="flex w-full py-3 mb-3 justify-center items-center text-xs text-zinc-400 dark:text-zinc-600">
        <Calendar className="w-3 h-3 mr-1" />
        {format(initialData.createdAt, DATE_FORMAT)}
      </div>
      {/* Tags */}
      <TagInput
        initialTags={initialData.tags}
        preview={preview}
        onChange={onChange}
      />
      {/* Series */}
    </div>
  );
};

export default Toolbar;
