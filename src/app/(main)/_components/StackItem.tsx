import React from "react";

const StackItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-3 py-1 flex items-center rounded-lg bg-background shadow-md text-primary font-medium border-zinc-100 dark:border-zinc-600 border-[1px] gap-x-2">
      {children}
    </div>
  );
};

export default StackItem;
