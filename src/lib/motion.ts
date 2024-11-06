import { MotionStyle, MotionValue } from "framer-motion";

type MotionStyleWithCssVar = {
  [K in keyof MotionStyle as K | `--${string}`]:
    | MotionStyle[K]
    | MotionValue<number>
    | MotionValue<string>
    | MotionValue<any>;
};

export const stylesWithCssVar = (styles: MotionStyleWithCssVar) =>
  styles as any;
