"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBlogTab } from "@/store/useBlogTab";

interface BlogTabViewWrapperProps {
  tabViews: JSX.Element[];
  className?: string;
  style?: object;
}

const BlogTabViewWrapper = ({ tabViews }: BlogTabViewWrapperProps) => {
  const selected = useBlogTab((state) => state.selected);
  const prevSelected = useBlogTab((state) => state.prevSelected);

  return (
    <AnimatePresence>
      <motion.div
        key={selected ? selected : -1}
        initial={{
          x: prevSelected < selected ? 10 : -10,
          opacity: 0,
        }}
        animate={{ x: 0, opacity: 1 }}
        // exit={{ x: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {selected !== -1 ? tabViews[selected] : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogTabViewWrapper;
