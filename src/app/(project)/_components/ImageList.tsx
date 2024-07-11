"use client";

import React, { useState } from "react";
import Image from "next/image";
import Carousel from "nuka-carousel";
import throttle from "lodash.throttle";
import { ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { DotIndicator } from "@/components";

interface ImageListProps {
  imageUrls: string[];
  className?: string;
  preview?: boolean;
  onChange: (target: "images", value: string[]) => void;
}

const ImageList = ({
  imageUrls,
  className,
  preview,
  onChange,
}: ImageListProps) => {
  const [value, setValue] = useState<string[]>(imageUrls);

  const [slideIdx, setSlideIdx] = useState<number>(0);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (event.currentTarget.scrollTop > 0) {
      setScrolled(true);
      return;
    }
    if (event.currentTarget.scrollTop == 0) {
      setScrolled(false);
      return;
    }
  };

  // throttle //
  // throttle condition
  const clickHandler = (next: number): any => {
    setSlideIdx(next);
  };

  const throttleClickHandler = throttle(
    (condition: Function, index?: number) => {
      const next = condition();
      return clickHandler(next != null ? next : index);
    },
    500,
    { leading: true }
  );
  // -------------------------------------------- //

  const onDeleteButtonClick = (index: number) => {
    const newValue = value;
    newValue.splice(index, 1);

    setValue(newValue);
    onChange("images", newValue);
  };

  return (
    <div className={cn("flex flex-col xmd:flex-row w-full", className)}>
      {/* CAROUSEL */}
      <div className="relative w-full sm:max-w-[600px] sm:max-h-[600px] mx-auto xmd:w-[50%]">
        <Carousel
          withoutControls={true}
          slideIndex={slideIdx}
          beforeSlide={(_, v) => setSlideIdx(v)}
        >
          {value?.map((url) => (
            <div
              key={url}
              className="relative h-full aspect-square overflow-hidden bg-black dark:bg-white"
            >
              <Image
                priority
                src={url}
                alt="product image"
                fill={true}
                sizes="30vw"
                style={{ objectFit: "contain" }}
                draggable={false}
              />
            </div>
          ))}
        </Carousel>
      </div>
      {/* CAROUSEL CONTROLLER */}
      <div className="flex w-full h-6 justify-center xmd:hidden">
        <DotIndicator current={slideIdx} length={value.length} />
      </div>

      {/* IMAGE LIST */}
      <div
        className="relative hidden xmd:block xmd:w-[50%] aspect-square overflow-y-scroll scrollbar-hide overscroll-y-contain "
        onScroll={handleScroll}
      >
        <div className="grid grid-cols-3">
          {value?.map((url, index) => (
            <div
              key={url}
              className="relative w-full aspect-square overflow-hidden"
            >
              <Image
                priority
                onClick={() => throttleClickHandler((): any => null, index)}
                src={url}
                alt="product image"
                fill={true}
                sizes="30vw"
                style={{ objectFit: "cover" }}
                draggable={false}
              />
              {!preview && (
                <div
                  role="button"
                  onClick={() => onDeleteButtonClick(index)}
                  className="absolute top-2 right-2 rounded-full p-1 bg-zinc-200/50 dark:bg-zinc-600/50"
                >
                  <X className="w-3 h-3 stroke-red-600 stroke-2" />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Notic for scroll */}
        <div
          className={`absolute left-[48%] bottom-[10px] p-2 flex items-center rounded-full transition-opacity duration-500 bg-zinc-200/50 dark:bg-zinc-600/50 ${
            value.length > 9 && !scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <ChevronDown className="w-5 h-5 stroke-primary stroke-2" />
        </div>
      </div>
    </div>
  );
};

export default ImageList;
