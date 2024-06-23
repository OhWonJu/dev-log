"use client";

import React, { PropsWithChildren, useEffect } from "react";

import useAuthStore from "@/store/useAuthsStore";

const AuthProvider = ({
  children,
  isAdmin,
}: PropsWithChildren<{ isAdmin: boolean }>) => {
  const { auth, setAuth } = useAuthStore();

  useEffect(() => {
    setAuth(isAdmin);
  }, [isAdmin, setAuth]);

  return <>{children}</>;
};

export default AuthProvider;
