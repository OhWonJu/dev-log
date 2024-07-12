"use client";

import React from "react";

import useAuthStore from "@/store/useAuthsStore";

import { Button } from "@/components/ui/button";
import { useModal } from "@/store/useModalStore";

const CreateProjectButton = () => {
  const { auth } = useAuthStore();
  const { onOpen } = useModal();

  if (!auth) return null;

  return (
    <React.Fragment>
      <Button
        className="fixed bottom-10 right-[10%] bg-symbol-500 text-white text-lg"
        role="button"
        onClick={() => onOpen("createProject")}
      >
        새 프로젝트 작성
      </Button>
    </React.Fragment>
  );
};

export default CreateProjectButton;
