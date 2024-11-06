import { easeInOut, Variants } from "framer-motion";

export const fadeIn: Variants = {
  initial: {
    zIndex: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: easeInOut },
    willChange: "opacity",
  },
  animate: {
    zIndex: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: easeInOut },
    willChange: "opacity",
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: easeInOut },
    willChange: "opacity",
  },
};

export const fadeInDelay300: Variants = {
  initial: {
    zIndex: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: easeInOut },
    willChange: "opacity",
  },
  animate: {
    zIndex: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: easeInOut, delay: 0.3 },
    willChange: "opacity",
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: easeInOut },
    willChange: "opacity",
  },
};

export const fadeInUp: Variants = {
  initial: {
    zIndex: 0,
    opacity: 0,
    y: 30,
    transition: { duration: 0.3, ease: easeInOut },
    willChange: "opacity, transform",
  },
  animate: {
    zIndex: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeInOut },
    willChange: "opacity, transform",
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    y: 30,
    transition: { duration: 0.3, ease: easeInOut },
    willChange: "opacity, transform",
  },
};

export const ReciptAnimation: Variants = {
  animate: {
    zIndex: 0.5,
    opacity: 1,
    y: [
      "-110%",
      "-95%",
      "-80%",
      "-75%",
      "-70%",
      "-60%",
      "-56%",
      "-52%",
      "-48%",
      "-44%",
      "-40%",
      "-36%",
      "-32%",
      "-28%",
      "-15%",
      0,
    ],
    transition: {
      times: [
        0, 0.1, 0.3, 0.32, 0.4, 0.42, 0.46, 0.52, 0.56, 0.6, 0.64, 0.68, 0.7,
        0.75, 1,
      ], // 각 단계의 타이밍 (0 ~ 1 사이의 값)
      duration: 2, // 애니메이션의 총 시간
      ease: easeInOut, // ease 옵션
      delay: 1,
    },
    willChange: "opacity, transform",
  },
};
