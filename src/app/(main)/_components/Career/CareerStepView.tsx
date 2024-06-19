import { StepWrapper } from "@/components";
import React from "react";

interface CareerStepView {
  data: { date: string; content: string }[];
}

const CareerStepView = ({ data }: CareerStepView) => {
  return (
    <div className="flex flex-col pl-10">
      {data.map(({ date, content }, index) => (
        <div key={index} className="flex flex-col mb-8">
          <h4 className="font-bold text-lg mb-2 text-zinc-400 dark:text-zinc-600">
            {date}
          </h4>
          <p className="font-semibold text-base">{content}</p>
        </div>
      ))}
    </div>
  );
};

export default CareerStepView;
