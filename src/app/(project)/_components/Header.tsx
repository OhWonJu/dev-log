"use client";

import React from "react";
import { Project } from "prisma/prisma-client";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { TextArea, TitleInput } from "@/components";

import ImageList from "./ImageList";
import StackInput from "./StackInput";

interface HeaderProps {
  initialData: Project;
  onChange: (
    Target:
      | "title"
      | "description"
      | "images"
      | "period"
      | "headCount"
      | "stacks",
    value: any
  ) => void;
  preview?: boolean;
}

const Header = ({ initialData, onChange, preview }: HeaderProps) => {
  return (
    <div
      className={cn(
        "py-8 mb-8 group relative md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto border-b px-6"
      )}
    >
      {/* Images */}
      {initialData.images && initialData.images.length > 0 && (
        <ImageList
          imageUrls={initialData.images}
          preview={preview}
          onChange={onChange}
        />
      )}
      {!preview && (
        <div className="flex justify-center my-6">
          <Button
            //  onClick={coverImage.onOpen}
            variant={"outline"}
            size={"sm"}
            className="text-muted-foreground text-xs"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Images
          </Button>
        </div>
      )}
      {/* Info area */}
      <div className="flex flex-col lg:flex-row w-full mt-10 gap-y-8">
        <section className="flex-[2]">
          <TitleInput
            initialTitle={initialData.title}
            onChange={onChange}
            preview={preview}
            textClassName="text-left"
          />
          {/* Description */}
          <TextArea
            initialContent={initialData.description}
            onChange={(value) => onChange("description", value)}
            preview={preview}
          />
        </section>
        <aside className="flex-1 flex flex-col gap-y-6">
          <div className="flex flex-col">
            <strong className="text-xl mb-1">개발 기간</strong>
            <TextArea
              initialContent={initialData.period}
              onChange={(value) => onChange("period", value)}
              preview={preview}
              textClassName="font-medium"
            />
          </div>
          <div className="flex flex-col">
            <strong className="text-xl mb-1">개발 스택</strong>
            <StackInput
              initialStacks={initialData.stacks}
              onChange={onChange}
              preview={preview}
            />
          </div>
          <div className="flex flex-col">
            <strong className="text-xl mb-1">개발 인원</strong>
            <TextArea
              initialContent={initialData.headCount}
              onChange={(value) => onChange("headCount", value)}
              preview={preview}
              textClassName="font-medium"
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Header;
