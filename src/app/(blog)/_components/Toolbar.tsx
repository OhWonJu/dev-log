"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DocumentWithTags } from "@/types";
import { Calendar, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";

import TitleInput from "./TitleInput";
import TagInput from "./TagInput";

interface ToolbarProps {
  initialData: DocumentWithTags;
  onChange: (
    target: "title" | "seriesId" | "newTags" | "isPublished" | "isPinned",
    value: any
  ) => void;
  preview?: boolean;
}

const DATE_FORMAT = "yyyy.MM.dd";

const Toolbar = ({ initialData, onChange, preview }: ToolbarProps) => {
  const [isPublished, setIsPublished] = useState(initialData.isPublished);
  const [isPinned, setIsPinned] = useState(initialData.isPinned);

  const handlePublish = () => {
    const newState = !isPublished;
    onChange("isPublished", newState);
    setIsPublished(newState);
  };

  const handlePin = () => {
    const newState = !isPinned;
    onChange("isPinned", newState);
    setIsPinned(newState);
  };

  return (
    <div className="py-8 mb-8 px-[54px] group relative gap-y-4 md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto border-b ">
      {/* Title */}
      <TitleInput
        initialTitle={initialData.title}
        preview={preview}
        onChange={onChange}
      />
      <div className="flex w-full py-3 mb-3 justify-center items-center text-xs font-semibold text-zinc-400 dark:text-zinc-600">
        <Calendar className="w-3 h-3 mr-1" />
        {format(initialData.createdAt, DATE_FORMAT)}
      </div>
      {/* Tags */}
      <TagInput
        initialTags={initialData.tags}
        preview={preview}
        onChange={onChange}
      />
      {/* Pin & Publish */}
      {!preview && (
        <div className="flex w-full justify-end gap-x-2">
          <Button variant={"outline"} onClick={handlePin}>
            {isPinned ? <>Pinned</> : <>Unpinned</>}
          </Button>
          <Button variant={"outline"} onClick={handlePublish}>
            {isPublished ? (
              <>
                Published
                <Globe className="text-sky-500 w-4 h-4 ml-2" />
              </>
            ) : (
              <>Unpublished</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
