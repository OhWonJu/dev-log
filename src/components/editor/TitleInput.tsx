"use client";

import { cn } from "@/lib/utils";
import React, { ElementRef, useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

interface TitleInputProps {
  initialTitle: string;
  onChange?: (target: "title", value: string) => void;
  preview?: boolean;
  textClassName?: string;
}

const TitleInput = ({
  initialTitle,
  onChange,
  preview,
  textClassName,
}: TitleInputProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialTitle);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      // setValue(initialTitle);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    onChange && onChange("title", value);
    // mutate({ title: value || "Untitled" });
  };

  const onKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  return (
    <>
      {isEditing ? (
        <TextAreaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeydown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className={cn(
            "text-2xl sm:text-3xl md:text-6xl text-center w-full mb-6 bg-transparent font-bold break-words outline-none resize-none",
            textClassName
          )}
        />
      ) : (
        <h1
          role="heading"
          onClick={enableInput}
          className={cn(
            "text-2xl sm:text-3xl md:text-6xl text-center mb-6 font-bold break-words outline-none",
            textClassName
          )}
        >
          {value}
        </h1>
      )}
    </>
  );
};

export default TitleInput;
