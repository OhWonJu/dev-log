"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DocumentWithTagsWithSeries } from "@/types";
import { Calendar, Globe, ImageIcon, Trash } from "lucide-react";

import { useModal } from "@/store/useModalStore";

import { Button } from "@/components/ui/button";

import TitleInput from "./TitleInput";
import TagInput from "./TagInput";
import { useCoverImage } from "@/hooks/UseCoverImage";
import Cover from "./Cover";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  initialData: DocumentWithTagsWithSeries;
  onChange: (
    target: "title" | "seriesId" | "newTags" | "isPublished" | "isPinned",
    value: any
  ) => void;
  preview?: boolean;
}

const DATE_FORMAT = "yyyy.MM.dd";

const Toolbar = ({ initialData, onChange, preview }: ToolbarProps) => {
  const { onOpen, data } = useModal();
  const coverImage = useCoverImage();

  data.documentId = initialData.id;

  const [isPublished, setIsPublished] = useState(initialData.isPublished);
  const [isPinned, setIsPinned] = useState(initialData.isPinned);
  const [seriesName, setSeriesName] = useState(
    initialData.series ? initialData.series.name : "시리즈 선택"
  );

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

  useEffect(() => {
    let newName = seriesName;

    if (!data.seriesName) return;

    if (data.seriesName === seriesName) newName = "시리즈 선택";
    else newName = data.seriesName;

    setSeriesName(newName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.seriesName]);

  return (
    <div
      className={cn(
        "py-8 mb-8 roup relative md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto border-b",
        !preview && "px-[54px]",
        preview && "px-6 md:px-[54px]"
      )}
    >
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
      {/* CoverImage */}
      {!initialData.coverImage && !preview && (
        <div className="flex justify-center my-6">
          <Button
            onClick={coverImage.onOpen}
            variant={"outline"}
            size={"sm"}
            className="text-muted-foreground text-xs"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        </div>
      )}
      {initialData.coverImage && !preview && (
        <Cover url={initialData.coverImage} preview={preview} />
      )}
      {/* Tags */}
      <TagInput
        initialTags={initialData.tags}
        preview={preview}
        onChange={onChange}
      />
      {/* Utils*/}
      {!preview && (
        <div className="flex w-full justify-end gap-x-2 mt-6">
          <Button
            variant={"outline"}
            onClick={() => onOpen("seriesSelect")}
            className="relative"
          >
            <span className="absolute text-[8px] text-zinc-400 -top-1 left-[0.7rem] px-1 ">
              Series
            </span>
            {seriesName}
          </Button>
          <Button variant={"outline"} onClick={handlePin} className="relative">
            <span className="absolute text-[8px] text-zinc-400 -top-1 left-[0.7rem] px-1 ">
              Pin
            </span>
            {isPinned ? <>Pinned</> : <>Unpinned</>}
          </Button>
          <Button
            variant={"outline"}
            onClick={handlePublish}
            className="relative"
          >
            <span className="absolute text-[8px] text-zinc-400 -top-1 left-[0.7rem] px-1 ">
              Publish
            </span>
            {isPublished ? (
              <>
                Published
                <Globe className="text-sky-500 w-4 h-4 ml-2" />
              </>
            ) : (
              <>Unpublished</>
            )}
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              data.documentId = initialData.id;
              onOpen("deletePost");
            }}
            className="relative"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
