"use client";

import { cn } from "@/lib/utils";
import React, { ElementRef, useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

interface TextAreaProps {
  initialContent: string | null;
  onChange?: (value: string) => void;
  preview?: boolean;
  textClassName?: string;
}

const TextArea = ({
  initialContent,
  onChange,
  preview,
  textClassName,
}: TextAreaProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialContent);

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
    onChange && onChange(value);
  };

  const onKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
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
          value={value ?? ""}
          onChange={(e) => onInput(e.target.value)}
          className={cn(
            "text-sm  text-left w-full bg-transparent break-words outline-none resize-none",
            textClassName
          )}
        />
      ) : (
        <p
          onClick={enableInput}
          className={cn(
            "text-sm text-left break-words outline-none whitespace-pre-line",
            textClassName
          )}
        >
          {value ? value : !preview ? "please enter some content..." : ""}
        </p>
      )}
    </>
  );
};

export default TextArea;
