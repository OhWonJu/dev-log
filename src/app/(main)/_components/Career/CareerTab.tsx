import React, { Dispatch, MutableRefObject, SetStateAction } from "react";

import style from "./career.style.module.css";
import { cn } from "@/lib/utils";

interface CareerTabProps {
  data: { year: number }[];
  focusedStep: number;
  setFocusedStep: Dispatch<SetStateAction<number>>;
  prevFocusedStep: MutableRefObject<number>;
}

const CareerTab = ({
  data,
  focusedStep,
  setFocusedStep,
  prevFocusedStep,
}: CareerTabProps) => {
  const onTabClick = (index: number) => {
    prevFocusedStep.current = focusedStep;
    setFocusedStep(index);
  };

  return (
    <div className="flex flex-col px-10">
      <ul className="pl-10">
        {data.map((d, index) => (
          <li
            key={index}
            data-year={d.year}
            onClick={() => onTabClick(index)}
            className={cn(
              style.careerTab,
              focusedStep === index && style.active,
              "text-zinc-400 dark:text-zinc-600 border-l-2 after:bg-zinc-400 dark:after:bg-zinc-600 border-zinc-400 dark:border-zinc-600 hover:cursor-pointer"
            )}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default CareerTab;
