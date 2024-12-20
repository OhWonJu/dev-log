"use client";

import React, { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

import { fadeIn } from "@/constants/animations";

import { AnimatedBox, Hero } from "../_components";

const Home = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.69, 0.7],
    [1, 1, 0]
  );

  return (
    <div ref={targetRef} className="h-full">
      <div className="sticky top-1/2 -translate-y-1/2 h-[80vh]">
        <AnimatedBox
          variants={fadeIn}
          initial="animate"
          motionValue={sectionOpacity}
          className="absolute top-0 w-full h-full"
        >
          <div className="h-full w-full flex justify-center items-center px-6 md:px-0">
            <Hero />
          </div>
        </AnimatedBox>
      </div>
    </div>
  );
};

export default Home;
