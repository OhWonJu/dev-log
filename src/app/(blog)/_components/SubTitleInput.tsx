"use client";

import React, { ElementRef, useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

interface TitleInputProps {
  initialSubTitle?: string | null;
  onChange?: (target: "subTitle", value: string) => void;
  preview?: boolean;
}

const SubTitleInput = ({
  initialSubTitle,
  onChange,
  preview,
}: TitleInputProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialSubTitle ?? "");

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
    onChange && onChange("subTitle", value);
    // mutate({ title: value || "Untitled" });
  };

  const onKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  if (preview) return null;

  return (
    <TextAreaAutoSize
      ref={inputRef}
      onBlur={disableInput}
      onKeyDown={onKeydown}
      placeholder="Please input descrition..."
      value={value}
      onChange={(e) => onInput(e.target.value)}
      className="text-sm text-center w-full mb-6 bg-transparent font-bold break-words outline-none resize-none"
    />
  );
};

export default SubTitleInput;
