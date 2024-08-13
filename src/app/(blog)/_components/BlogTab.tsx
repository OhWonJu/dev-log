"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useBlogTab } from "@/store/useBlogTab";
import { usePathname, useRouter } from "next/navigation";

const BLOG_TAB_MAP = [
  {
    title: "Recent Recipes",
  },
  {
    title: "Signature Recipes",
  },
  {
    title: "Courses",
  },
];

const BlogTab = () => {
  const pathname = usePathname();
  const router = useRouter();

  const selected = useBlogTab((state) => state.selected);
  const setSelected = useBlogTab((state) => state.setSelected);

  const handleTabClick = (index: number) => {
    if (pathname !== "/blog") {
      router.push("/blog");
    }

    setSelected(index);
  };

  return (
    <div className="relative flex items-center gap-x-2 xs:gap-x-4 sm:gap-x-6">
      {BLOG_TAB_MAP.map((item, index) => (
        <div
          key={index}
          role="button"
          onClick={() => handleTabClick(index)}
          className="relative h-full flex items-center"
        >
          <span
            className={cn(
              "text-sm sm:text-base font-semibold capitalize text-zinc-400 py-3",
              index === selected && "text-primary"
            )}
          >
            {item.title}
          </span>
          {index === selected && (
            <motion.span
              layoutId="blogtab-underline"
              className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] bg-primary"
              style={{ originY: "0px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogTab;
