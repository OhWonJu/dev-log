"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
  usingPules = true,
}: {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  href?: string;
  className?: string;
  containerClassName?: string;
  usingPules?: boolean;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <div
      className={cn(
        "relative group/pin z-50  cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2 w-full h-full"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 top-1/2  flex justify-start items-start  rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] transition duration-700 overflow-hidden w-full h-full"
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} usingPules={usingPules} />
    </div>
  );
};

export const PinPerspective = ({
  title,
  href,
  usingPules,
}: {
  title?: string | React.ReactNode;
  href?: string;
  usingPules?: boolean;
}) => {
  const Title = ({ children }: { children: string | React.ReactNode }) => {
    if (typeof title === "string")
      return (
        <span className="relative z-20 text-primary text-xs font-bold inline-block p-4">
          {children}
        </span>
      );
    else
      return (
        <div className="relative z-20 text-primary inline-block p-4">
          {children}
        </div>
      );
  };

  return (
    <motion.div className="pointer-events-none  w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className=" w-full h-full -mt-7 flex-none  inset-0">
        <div className="absolute top-0 inset-x-0  flex justify-center">
          <a
            href={href}
            target={"_blank"}
            className="relative flex space-x-2 items-center z-10 rounded-md bg-background py-0.5 px-4 ring-1 ring-zinc-400/10 shadow-lg"
          >
            <Title>{title}</Title>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-symbol-500/0 via-symbol-500/90 to-symbol-500/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </a>
        </div>

        {usingPules && (
          <div
            style={{
              perspective: "1000px",
              transform: "rotateX(70deg) translateZ(0)",
            }}
            className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
          >
            <>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  opacity: [0, 1, 0.5, 0],
                  scale: 1,

                  z: 0,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: 0,
                }}
                className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-symbol-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              ></motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  opacity: [0, 1, 0.5, 0],
                  scale: 1,

                  z: 0,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: 2,
                }}
                className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-symbol-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              ></motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  opacity: [0, 1, 0.5, 0],
                  scale: 1,

                  z: 0,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: 4,
                }}
                className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-symbol-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              ></motion.div>
            </>
          </div>
        )}

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-symbol-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-symbol-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40  " />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-symbol-500 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-symbol-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40 " />
        </>
      </div>
    </motion.div>
  );
};
