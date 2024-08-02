import React, { useEffect, useRef, useState } from "react";

export const useHorizontalScroll = (ref: React.RefObject<HTMLElement>) => {
  const frame = useRef(0);
  const pos = useRef({ left: 0, x: 0 });

  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    const mouseDownHandler = (event: MouseEvent) => {
      event.stopPropagation();

      if (!ref.current) return;

      ref.current.style.cursor = "grabbing";
      ref.current.style.userSelect = "none";

      pos.current = { left: ref.current.scrollLeft, x: event.clientX };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      event.stopPropagation();

      if (!ref.current) return;
      if (!isGrabbing) setIsGrabbing(true);

      const dx = event.clientX - pos.current.x;

      frame.current = requestAnimationFrame(() => {
        if (!ref.current) return;

        ref.current.scrollLeft = pos.current.left - dx;
      });
    };

    const mouseUpHandler = (event: MouseEvent) => {
      event.stopPropagation();

      if (!ref.current) return;
      setTimeout(() => {
        setIsGrabbing(false);
      }, 500);

      ref.current.style.cursor = "grab";
      ref.current.style.removeProperty("user-select");

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    const eventHandler = ref.current;

    eventHandler?.addEventListener("mousedown", mouseDownHandler);

    return () => {
      eventHandler?.removeEventListener("mousedown", mouseDownHandler);
      cancelAnimationFrame(frame.current);
    };
  }, [isGrabbing, ref]);

  return isGrabbing;
};
