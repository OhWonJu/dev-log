"use client";

import React, { useEffect } from "react";
import { motion, MotionValue, useAnimationControls } from "framer-motion";

import {
  Apollo,
  JavaScript,
  NestJsIcon,
  NextJsIcon,
  PrismaIcon,
  ReactIcon,
  Redux,
  StyledComponents,
  TailwindIcon,
  TanstackQueryIcon,
  TypeScript,
  GraphQl,
} from "@/components/icons";
import StackItem from "./StackItem";
import { fadeInUp } from "@/constants/animations";

const STACK_MAP = [
  {
    icon: <JavaScript className="w-4 h-4 rounded-sm" />,
    stackName: "Javascript",
  },
  {
    icon: <TypeScript className="w-4 h-4 rounded-sm" />,
    stackName: "TypeScript",
  },
  {
    icon: <ReactIcon className="w-4 h-4 rounded-sm" />,
    stackName: "React",
  },
  {
    icon: <NextJsIcon className="w-4 h-4 rounded-sm fill-primary" />,
    stackName: "Next.js",
  },
  {
    icon: <TanstackQueryIcon className="w-4 h-4 rounded-sm" />,
    stackName: "TanstackQuery",
  },
  {
    icon: <Redux className="w-4 h-4 rounded-sm" />,
    stackName: "ReduxToolKit",
  },
  {
    icon: null,
    stackName: "Zustand",
  },
  {
    icon: <StyledComponents className="w-4 h-4 rounded-sm" />,
    stackName: "StyledComponents",
  },
  {
    icon: <TailwindIcon className="w-4 h-4 rounded-sm" />,
    stackName: "TailwindCSS",
  },
  {
    icon: <NestJsIcon className="w-4 h-4 rounded-sm" />,
    stackName: "Nest.js",
  },
  {
    icon: <GraphQl className="w-4 h-4 rounded-sm" />,
    stackName: "GraphQL",
  },
  {
    icon: <PrismaIcon className="w-4 h-4 rounded-sm" />,
    stackName: "Prisma",
  },
  {
    icon: <Apollo className="w-4 h-4 rounded-sm" />,
    stackName: "ApolloClient",
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const StackList = ({ motionValue }: { motionValue: MotionValue<number> }) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (!motionValue) return;

    const update = (progress: number) => {
      if (progress === 1) {
        controls.start("animate");
      } else {
        controls.start("exit");
      }
    };

    const unsubscribe = motionValue.on("change", update);

    // cleanup 함수에서 스크롤 이벤트 구독 해제
    return () => unsubscribe();
  }, [motionValue, controls]);

  return (
    <motion.div
      className="w-[90%] md:w-[650px] flex flex-wrap justify-center gap-4 mx-auto"
      variants={containerVariants}
      initial="initial"
      animate={controls}
    >
      {STACK_MAP.map(({ icon, stackName }, index) => (
        <motion.div key={index} variants={fadeInUp}>
          <StackItem>
            {icon}
            {stackName}
          </StackItem>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StackList;
