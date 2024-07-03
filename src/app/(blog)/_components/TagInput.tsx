"use client";

import React, { ElementRef, useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { Tag } from "prisma/prisma-client";
import { EditIcon } from "lucide-react";

interface TagInputProps {
  initialTags: Tag[];
  onChange?: (target: "newTags", value: string) => void;
  preview?: boolean;
}

const TagInput = ({ initialTags, onChange, preview }: TagInputProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(
    initialTags.reduce((acc, cur) => {
      if (cur) return `${acc}#${cur.tagName} `;
      else return acc;
    }, "")
  );

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      // setValue(tagsString);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    onChange && onChange("newTags", value);
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
          placeholder="input tagname e.g #Tag"
          onChange={(e) => onInput(e.target.value)}
          className="text-sm w-full text-center p-2 bg-transparent font-semibold break-words outline-none resize-none"
        />
      ) : (
        <div className="group/tag flex w-full items-center justify-center text-sm font-semibold break-words outline-none">
          <div className="flex flex-wrap gap-1">
            {value &&
              value
                .trimEnd()
                .split(" ")
                .map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="px-3 py-2 rounded-full border bg-background shadow-sm border-zinc-400 dark:border-zinc-600"
                  >
                    {tag.replace(/#/g, "")}
                  </div>
                ))}
          </div>
          {!preview && (
            <div
              role={!preview ? "button" : "article"}
              aria-label="TagEdit"
              onClick={enableInput}
              className="p-2 ml-4"
            >
              <EditIcon className="hidden group-hover/tag:block w-5 h-5 text-zinc-400 dark:text-zinc-600" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TagInput;
