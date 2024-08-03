"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
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
import { useMediaQuery } from "usehooks-ts";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

const Navigator = () => {
  const scrolled = useScrollTop();
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { selected, setSelected } = useNavTab();

  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const menuRef = useRef<ElementRef<"div">>(null);

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

  const toggleCollapse = () => {
    if (!menuRef.current) return;

    const collapse = !isCollapsed;

    menuRef.current.style.height = collapse ? "0px" : "100vh";

    setIsCollapsed(collapse);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <nav
      className={cn(
        "z-[9999] bg-transparent fixed top-0 w-full",
        scrolled && "bg-background border-b shadow-sm",
        isMobile && !isCollapsed && "bg-background"
      )}
      style={{ height: NAV_HEIGHT }}
    >
      <div className="px-6 flex w-full items-center box-border h-full">
        {scrolled && (
          <Link
            href={"/"}
            onClick={() => setSelected(0)}
            className="min-w-[80px] w-[80px]"
          >
            <Recipe fill={true} />
          </Link>
        )}
        {isMobile ? (
          <Button
            onClick={toggleCollapse}
            variant={"ghost"}
            className="ml-auto p-1"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        ) : (
          <div className="ml-auto justify-end w-full h-full flex items-center gap-x-6">
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
                    style={{ originY: "0px" }}
                  />
                )}
              </Link>
            ))}
            <ModeToggle />
          </div>
        )}
      </div>
      {isMobile && (
        <div
          ref={menuRef}
          className="absolute w-full overflow-hidden"
          style={{ top: NAV_HEIGHT - 1 }}
        >
          <div
            onClick={toggleCollapse}
            className="h-full w-full bg-primary-foregroun backdrop-blur-sm"
          />
          <div className="absolute top-0 flex items-end flex-col w-full bg-background border-b shadow-sm px-6 pb-4">
            {TAB_MAP.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                scroll={false}
                onClick={(event) => {
                  handleTabClick(event, item.link, index);
                  toggleCollapse();
                }}
                className="relative h-full flex items-center p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <span
                  className={cn(
                    "text-base font-medium capitalize",
                    index === selected && "font-bold"
                  )}
                >
                  {item.contant}
                </span>
              </Link>
            ))}
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigator;
