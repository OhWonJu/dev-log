"use client";

import React, { useEffect, useMemo, useState } from "react";

import { getElementTopPosition } from "@/lib/getElementTopPosition";
import { cn } from "@/lib/utils";

import { useNavTab } from "@/store/useNavTab";

interface SectionProps {
  id?: string;
  index?: number;
  className?: string;
  children?: React.ReactNode;
}

const Section = ({ id = "", index, className, children }: SectionProps) => {
  const { setSelected } = useNavTab();

  const sectionEelement =
    typeof document !== "undefined" ? document.getElementById(id) : null;

  const sectionTopPosition = useMemo(() => {
    if (!sectionEelement) return null;

    return getElementTopPosition(sectionEelement);
  }, [sectionEelement]);

  useEffect(() => {
    function updateNavSelected() {
      if (typeof sectionTopPosition !== "number" || typeof index !== "number")
        return;

      if (window.scrollY >= sectionTopPosition) setSelected(index);
      // TODO: 해시 갱신
    }

    window.addEventListener("scroll", updateNavSelected);

    return () => window.removeEventListener("scroll", updateNavSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, sectionTopPosition]);

  return (
    <section id={id} className={cn(className)}>
      {children}
    </section>
  );
};

export default Section;
