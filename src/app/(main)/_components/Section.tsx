"use client";

import React, { useEffect, useMemo } from "react";

import { NAV_HEIGHT } from "@/constants/style";

import { getElementOffsetBoundery } from "@/lib/getElementTopPosition";
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

  const sectionOffset = useMemo(() => {
    if (!sectionEelement) return null;

    return getElementOffsetBoundery(sectionEelement);
  }, [sectionEelement]);

  useEffect(() => {
    function updateNavSelected() {
      if (!sectionOffset || typeof index !== "number") return;

      if (window.scrollY >= sectionOffset.topOffset) setSelected(index);
      // TODO: 해시 갱신
    }

    window.addEventListener("scroll", updateNavSelected);

    return () => window.removeEventListener("scroll", updateNavSelected);
  }, [index, sectionOffset, setSelected]);

  return (
    <section
      id={id}
      className={cn(className)}
      style={{ paddingTop: NAV_HEIGHT * 2 }}
    >
      {children}
    </section>
  );
};

export default Section;
