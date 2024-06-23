import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateChatCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();
