"use client";

import React, { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Document } from "prisma/prisma-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { generateDocumentIndexMap } from "@/lib/utils";
import useAuthStore from "@/store/useAuthsStore";

import { Skeleton } from "@/components/ui/skeleton";

import Toolbar from "./Toolbar";

interface PostSectionProps {
  initialData: Document;
}

const PostSection = ({ initialData }: PostSectionProps) => {
  const { auth } = useAuthStore();

  const title = useRef<string>(initialData ? initialData.title : "Untitled");
  const content = useRef<string | null>(
    initialData.content ? initialData.content : ""
  );

  const onSubmit = async () => {
    const indexStructure = generateDocumentIndexMap(content.current);

    updatePost({
      title: title.current,
      content: content.current,
      indexMap: JSON.stringify(indexStructure),
    });
  };

  const queryClient = useQueryClient();
  const { mutate: updatePost } = useMutation({
    mutationFn: async ({
      content,
      title,
      indexMap,
    }: {
      title?: string | null;
      content?: string | null;
      indexMap?: string | null;
    }) =>
      await axios.patch(`/api/documents/${initialData.id}`, {
        title,
        content,
        indexMap,
      }),
  });

  const Editor = useMemo(
    () =>
      dynamic(() => import("./Editor"), {
        ssr: false,
        loading: () => (
          <div className="md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
            <div className="space-y-4 pl-[56px] pt-[78px]">
              <Skeleton className="h-16 w-[30%]" />
              <Skeleton className="h-6 w-[80%]" />
              <Skeleton className="h-6 w-[40%]" />
              <Skeleton className="h-6 w-[60%]" />
              <Skeleton className="h-6 w-[80%]" />
              <Skeleton className="h-6 w-[40%]" />
              <Skeleton className="h-6 w-[60%]" />
            </div>
          </div>
        ),
      }),
    []
  );

  return (
    <div className="pb-40">
      <div className="w-screen md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        <Toolbar
          initialData={initialData}
          preview={!auth}
          onChange={(value) => (title.current = value)}
        />
        <Editor
          initialContent={initialData.content}
          editable={auth}
          postId={initialData.id}
          initialIndexMap={initialData.indexMap}
          onSubmit={() => {}}
          onChange={(value) => {
            content.current = value;
          }}
        />
      </div>
    </div>
  );
};

export default PostSection;
