"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { TAB_MAP } from "@/constants/navigator";
import { NAV_HEIGHT } from "@/constants/style";

import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/useScrollTop";

import { useNavTab } from "@/store/useNavTab";

import { Recipe } from "./icons";
import ModeToggle from "./providers/ModeToggle";

const Navigator = () => {
  const scrolled = useScrollTop();
  const router = useRouter();

  const { selected, setSelected } = useNavTab();

  const handleTabClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string,
    index: number
  ) => {
    event.preventDefault();

    setSelected(index);

    // router.push(link);

    const href = event.currentTarget.href;

    const targetId = href.replace(/.*\#/, "");
    const element = document.getElementById(targetId);

    if (!element) {
      router.push(link);
      return;
    }

    element?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={cn(
        "z-[9999] bg-transparent fixed top-0 flex items-center w-full px-6 box-border",
        scrolled && "bg-background border-b shadow-sm"
      )}
      style={{ height: NAV_HEIGHT }}
    >
      {scrolled && (
        <div className="min-w-[80px] w-[80px]">
          <Recipe fill={true} />
        </div>
      )}
      <div className="md:ml-auto md:justify-end w-full h-full flex items-center gap-x-6">
        {TAB_MAP.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            scroll={false}
            onClick={(event) => handleTabClick(event, item.link, index)}
            className="relative h-full flex items-center"
          >
            <span className="text-base font-medium capitalize">
              {item.contant}
            </span>
            {index === selected && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-primary"
              />
            )}
          </Link>
        ))}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navigator;
