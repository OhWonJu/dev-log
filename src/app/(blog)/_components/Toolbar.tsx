"use client";

import { ElementRef, useRef, useState } from "react";
import { Document } from "prisma/prisma-client";
import TextAreaAutoSize from "react-textarea-autosize";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ToolbarProps {
  initialData: Document;
  onChange?: (value: string) => void;
  preview?: boolean;
}

const Toolbar = ({ initialData, onChange, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  // const queryClient = useQueryClient();

  // const { mutate } = useMutation({
  //   mutationFn: async (data: { title?: string; icon?: string }) =>
  //     await axios.patch(`/api/documents/${initialData.id}`, {
  //       title: data.title,
  //       icon: data.icon,
  //     }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [`document-${initialData.id}`],
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: ["documents"],
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: ["document-nav", { id: initialData.id }],
  //     });
  //   },
  // });

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    onChange && onChange(value);
    // mutate({ title: value || "Untitled" });
  };

  const onKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  return (
    <div className="pl-[54px] group relative">
      {isEditing ? (
        <TextAreaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeydown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-6xl bg-transparent font-bold break-words outline-none resize-none"
        />
      ) : (
        <div
          role="button"
          onClick={enableInput}
          className="pb-[11.5px] text-6xl font-bold break-words outline-none"
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
