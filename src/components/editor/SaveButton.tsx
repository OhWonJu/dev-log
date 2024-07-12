import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface SaveButtonProps {
  className?: string;
  clickHandler: () => void;
  disabled?: boolean;
}

const SaveButton = ({ clickHandler, className, disabled }: SaveButtonProps) => {
  return (
    <Button
      className={cn(
        "fixed bottom-10 right-[10%] bg-symbol-500 text-white text-lg",
        className
      )}
      role="button"
      onClick={clickHandler}
      disabled={disabled}
    >
      저장하기
    </Button>
  );
};

export default SaveButton;
