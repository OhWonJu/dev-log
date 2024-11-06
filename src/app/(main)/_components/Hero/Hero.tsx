"use client";

import React, { useEffect, useState } from "react";

import style from "./hero.style.module.css";

import Symbol from "../Symbol/Symbol";
import { cn } from "@/lib/utils";

const Hero = ({ className }: { className?: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        className,
        "flex flex-col items-center w-full max-w-[600px]"
      )}
    >
      <Symbol />
      <p
        className={cn(
          style.fade,
          "text-symbol-500 font-Kenwave text-[1.5rem] font-semibold opacity-0"
        )}
      >
        Portfolio & Devlog
      </p>
    </div>
  );
};

export default Hero;
