"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Tag } from "prisma/prisma-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { DocumentWithTags } from "@/types";
import { generateDocumentIndexMap, processTags } from "@/lib/utils";
import useAuthStore from "@/store/useAuthsStore";

import { Skeleton } from "@/components/ui/skeleton";

import Toolbar from "./Toolbar";
import { Button } from "@/components/ui/button";

interface PostSectionProps {
  initialData: DocumentWithTags;
}

const PostSection = ({ initialData }: PostSectionProps) => {
  const { auth } = useAuthStore();

  const infoData = useRef<{
    title: string;
    oldTags: Tag[];
    newTags: string | null;
    seriesId: string | null;
  }>({
    title: initialData.title ?? "Untitled",
    seriesId: initialData.seriesId ?? null,
    oldTags: initialData.tags ?? [],
    newTags: null,
  });
  const content = useRef<string | null>(
    initialData.content ? initialData.content : ""
  );

  const onSubmit = () => {
    const indexStructure = generateDocumentIndexMap(content.current);

    updatePost({
      title: infoData.current.title,
      content: content.current,
      indexMap: JSON.stringify(indexStructure),
      newTags: infoData.current.newTags,
    });
  };

  const queryClient = useQueryClient();
  const { mutate: updatePost, isPending } = useMutation({
    mutationFn: async ({
      content,
      title,
      indexMap,
      newTags,
    }: {
      title?: string | null;
      content?: string | null;
      indexMap?: string | null;
      newTags?: string | null;
    }) =>
      await axios.patch(`/api/documents/${initialData.id}`, {
        title,
        content,
        indexMap,
        newTags,
      }),
  });

  // short cut submit event handle
  useEffect(() => {
    const down = async (e: KeyboardEvent) => {
      if (!auth) return;

      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        const indexStructure = generateDocumentIndexMap(content.current);

        updatePost({
          title: infoData.current.title,
          content: content.current,
          indexMap: JSON.stringify(indexStructure),
          newTags: infoData.current.newTags,
        });
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [auth, updatePost]);

  const Editor = useMemo(
    () =>
      dynamic(() => import("./Editor"), {
        ssr: false,
        loading: () => (
          <div className="md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
            <div className="space-y-4 pl-[56px] pt-[78px]">
              <Skeleton className="h-16 w-[30%]" />
              <Skeleton className="h-6 w-[50%]" />
              <Skeleton className="h-6 w-[40%]" />
              <Skeleton className="h-6 w-[50%]" />
              <Skeleton className="h-6 w-[60%]" />
              <Skeleton className="h-6 w-[40%]" />
              <Skeleton className="h-6 w-[20%]" />
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
          onChange={(target: "title" | "seriesId" | "newTags", value: any) =>
            (infoData.current[target] = value)
          }
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
      {auth && (
        <Button
          className="fixed bottom-10 right-[10%] bg-symbol-500 text-white text-lg"
          role="button"
          onClick={onSubmit}
          disabled={isPending}
        >
          저장하기
        </Button>
      )}
    </div>
  );
};

export default PostSection;
