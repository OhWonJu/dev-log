"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/useAuthsStore";

import { Button } from "@/components/ui/button";

const PostCreateButton = () => {
  const router = useRouter();
  const { auth } = useAuthStore();

  const { mutate: createNewPost, isPending } = useMutation({
    mutationFn: async () =>
      await axios.post("/api/documents", { title: "Untitled" }),
    onSuccess: (data) => {
      router.push(`/blog/${data.data.id}`);
    },
  });

  return (
    <React.Fragment>
      {auth && (
        <Button
          className="fixed bottom-10 right-[10%] bg-symbol-500 text-white text-lg"
          role="button"
          onClick={() => createNewPost()}
          disabled={isPending}
        >
          새 포스트 작성
        </Button>
      )}
    </React.Fragment>
  );
};

export default PostCreateButton;
