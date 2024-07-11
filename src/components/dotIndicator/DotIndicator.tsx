"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import style from "./dotIndicator.style.module.css";

interface Indicator {
  ref: number;
}

interface DotIndicatorProps {
  current: number;
  length: number;
}

const MAX_VISIBLE_INDICATORS = 3;

const DotIndicator = ({ current, length }: DotIndicatorProps) => {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(MAX_VISIBLE_INDICATORS - 1);

  useEffect(() => {
    const newIndicators = [];
    for (let i = indicators.length || 0; i < length; i++) {
      newIndicators.push({ ref: i });
    }
    setIndicators(newIndicators);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  useEffect(() => {
    if (current < min) {
      setMin(current);
      setMax(current + MAX_VISIBLE_INDICATORS - 1);
      if (max > length) {
        setMax(length);
      }
    }
    if (current > max) {
      setMax(current);
      setMin(current - MAX_VISIBLE_INDICATORS + 1);
      if (min < 0) {
        setMin(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, length]);

  const getIndicatorClass = (ref: number): string => {
    if (ref === current) {
      return "active";
    }
    if (ref >= min && ref <= max) {
      return "std";
    }
    if (ref === min - 1 || ref === max + 1) {
      return "small";
    }
    // if (ref === min - 2 || ref === max + 2) {
    //   return "micro";
    // }
    return "hidden";
  };

  return (
    <div className="flex justify-center items-center">
      {indicators.map((indicator) => (
        <div
          key={indicator.ref}
          className={cn(
            style[getIndicatorClass(indicator.ref)],
            "w-[5px] h-[5px] m-[2px] rounded-full bg-primary-foreground overflow-hidden transition-all duration-500 ease-out indent-[-9999px]"
          )}
        />
      ))}
    </div>
  );
};

export default DotIndicator;
