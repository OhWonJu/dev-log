import { cn } from "@/lib/utils";

interface TagProps {
  tagName: string;
  className?: string;
}

const Tag = ({ tagName, className }: TagProps) => {
  return (
    <div
      className={cn(
        "px-2 py-1 rounded-full text-xs border bg-background shadow-sm border-zinc-400 dark:border-zinc-600",
        className
      )}
    >
      <span>{tagName}</span>
    </div>
  );
};

export default Tag;
