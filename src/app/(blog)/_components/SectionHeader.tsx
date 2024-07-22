import Link from "next/link";

interface SectionHeaderProps {
  url: string;
  title: string;
}

const SectionHeader = ({ url, title }: SectionHeaderProps) => {
  return (
    <Link href={url} className="flex justify-between sm:justify-start items-center mb-6">
      <h2
        role="button"
        className="text-3xl sm:text-4xl font-bold text-zinc-600 dark:text-zinc-300 mr-4"
      >
        {title}
      </h2>
      <span className="px-1 py-1 text-xs font-semibold text-zinc-300 dark:text-zinc-600 border-zinc-300 min-w-[70px]">
        see more
      </span>
    </Link>
  );
};

export default SectionHeader;
