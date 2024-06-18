import React from "react";

import style from "./receipt.style.module.css";

import { cn } from "@/lib/utils";

const Receipt = ({
  wrapperClassName,
  className,
  children,
}: {
  wrapperClassName?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="relative max-w-[300px] min-w-[250px] flex-grow">
      <div className="absolute w-full h-full py-4 top-0 left-0 bg-transparent box-border">
        <div className="w-full h-full shadow-receipt"></div>
      </div>

      <div className={cn(style.receiptWrapper, wrapperClassName)}>
        <div className={cn(style.border_top)} />
        <div className={cn(style.receipt_content, className)}>{children}</div>
        <div className={cn(style.border_bottom)} />
      </div>
    </div>
  );
};

const ReceiptSeparator = ({ className }: { className?: string }) => {
  return <div className={cn("w-full border-t-[1.5px] border-dashed border-black my-2", className)} />;
};

export { Receipt, ReceiptSeparator };
