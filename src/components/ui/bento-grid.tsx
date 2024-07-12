import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[30rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none bg-background dark:border-zinc-600 border border-zinc-300 justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="transition duration-200 px-4">
        {icon}
        <div className="font-bold text-xl mb-2 mt-2 px-4">
          {title}
        </div>
        <div className="font-normal text-zinc-600 text-xs dark:text-zinc-300 px-4 mb-4">
          {description}
        </div>
      </div>
    </div>
  );
};
