"use client";

import React, { ElementRef, useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { EditIcon } from "lucide-react";

interface StackInputProps {
  initialStacks: string[];
  onChange?: (target: "stacks", value: string[]) => void;
  preview?: boolean;
}

const StackInput = ({ initialStacks, onChange, preview }: StackInputProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialStacks.join(" "));

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
    const newValue = value.split(" ");

    setValue(value);
    onChange && onChange("stacks", newValue);
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
          placeholder="input stacks"
          onChange={(e) => onInput(e.target.value)}
          className="text-xs w-full text-left p-2 bg-transparent font-semibold break-words outline-none resize-none"
        />
      ) : (
        <div className="group/tag flex w-full items-center justify-start text-sm font-semibold break-words outline-none">
          <div className="flex flex-wrap gap-1">
            {value &&
              value
                .trimEnd()
                .split(" ")
                .map((stack: string, index: number) => (
                  <div
                    key={index}
                    className="px-2 py-1 rounded-full text-xs border bg-background shadow-sm border-zinc-400 dark:border-zinc-600"
                  >
                    <span>{stack}</span>
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

export default StackInput;
