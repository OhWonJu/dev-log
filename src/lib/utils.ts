import { IndexMap } from "@/types";
import { Block } from "@blocknote/core";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateChatCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

export const generateDocumentIndexMap = (indexData?: string | null) => {
  if (!indexData) return "";

  const data = JSON.parse(indexData) as Block[];

  let indexMap: IndexMap[] = [];

  const findHeader = (data: Block[]) => {
    data.forEach((content) => {
      if (content.type === "heading") {
        indexMap.push({
          id: content.id,
          // @ts-ignore
          content: content.content[0].text,
          level: content.props.level,
        });
      }

      if (content.children.length > 0) {
        findHeader(content.children);
      }
    });
  };

  findHeader(data);

  return indexMap;
};

export const processTags = (newTags: string) => {
  const tags = newTags.match(/#[^\s#]+/g) || [];

  return tags.map((tag) => ({
    where: { tagName: tag.replace(/#/g, "") },
    create: { tagName: tag.replace(/#/g, "") },
  }));
};

export const getImageSize = (
  url: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};
