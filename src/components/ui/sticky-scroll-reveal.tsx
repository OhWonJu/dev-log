"use client";
import React, { useRef } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  scrollYProgress,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
  scrollYProgress: MotionValue<any>;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="h-full w-full flex justify-center space-x-5 rounded-md p-10 overflow-y-hidden scrollbar-hide"
      ref={ref}
    >
      <div className="relative w-screen h-full max-w-xl">
        {content.map((item, index) => (
          <div
            key={item.title + index}
            className="absolute top-0 left-0 w-full h-full flex items-center flex-col justify-center"
          >
            <motion.h2
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: activeCard === index ? 1 : 0,
              }}
              className="text-2xl font-bold"
            >
              {item.title}
            </motion.h2>
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: activeCard === index ? 1 : 0,
              }}
              className="text-kg max-w-sm mt-10 whitespace-pre-line"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "hidden lg:block max-w-lg w-screen rounded-md sticky top-0 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
