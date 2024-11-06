"use client";

import {
  AnimationProps,
  motion,
  MotionProps,
  MotionValue,
  useAnimationControls,
} from "framer-motion";
import { ReactNode, useEffect } from "react";

interface AnimateBoxProps extends AnimationProps, MotionProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  motionValue?: MotionValue<number>;
  useTransition?: boolean;
  children: ReactNode;
}

const AnimatedBox = ({
  as = "div",
  className,
  motionValue,
  useTransition,
  children,
  ...props
}: AnimateBoxProps) => {
  const Container = motion[as as keyof typeof motion];

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
    <Container
      className={className}
      initial="initial"
      animate={controls}
      {...props}
    >
      {children}
    </Container>
  );
};

export default AnimatedBox;
