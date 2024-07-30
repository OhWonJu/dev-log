"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { NAV_HEIGHT } from "@/constants/style";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const BLOG_TAB_MAP = [
  {
    url: "/blog",
    title: "Recent Recipes",
  },
  {
    url: "/blog/signature-recipes",
    title: "Signature Recipes",
  },
  {
    url: "/blog/coureses",
    title: "Coureses",
  },
];

const BlogTab = () => {
  const pathname = usePathname();

  const [selected, setSelected] = useState<string>(pathname ?? "/blog");

  const handleTabClick = (url: string) => {
    setSelected(url);
  };

  return (
    <div className="relative flex items-center gap-x-6">
      {BLOG_TAB_MAP.map((item, index) => (
        <Link
          key={index}
          href={item.url}
          scroll={false}
          onClick={() => handleTabClick(item.url)}
          className="relative h-full flex items-center"
        >
          <span
            className={cn(
              "text-base font-semibold capitalize text-zinc-400 py-2",
              item.url === selected && "text-primary"
            )}
          >
            {item.title}
          </span>
          {item.url === selected && (
            <motion.span
              layoutId="blogtab-underline"
              className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] bg-primary"
              style={{ originY: "0px" }}
            />
          )}
        </Link>
      ))}
    </div>
  );
};

export default React.memo(BlogTab);
