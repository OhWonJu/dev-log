"use client";

import React, { PropsWithChildren, useEffect } from "react";

import useAuthStore from "@/store/useAuthsStore";
import { useNavTab } from "@/store/useNavTab";
import { usePathname } from "next/navigation";
import { TAB_MAP } from "@/constants/navigator";

const NavProvider = ({ children }: PropsWithChildren) => {
  const pathName = usePathname();

  const { setSelected } = useNavTab();

  useEffect(() => {
    if (pathName?.startsWith("/blog")) setSelected(3);
    if (pathName?.startsWith("/chats")) setSelected(-1);
  }, [pathName, setSelected]);

  return <>{children}</>;
};

export default NavProvider;
