"use client";

import React, { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Tag } from "prisma/prisma-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { DocumentWithTagsWithSeries } from "@/types";
import { generateDocumentIndexMap } from "@/lib/utils";
import useAuthStore from "@/store/useAuthsStore";

import { Skeleton } from "@/components/ui/skeleton";

import Toolbar from "./Toolbar";
import { Button } from "@/components/ui/button";
import Course from "./Course/Course";
import Giscus from "./Giscus";
import DocumentIndexCard from "./DocumentIndexCard";

interface PostSectionProps {
  initialData: DocumentWithTagsWithSeries;
}

const PostSection = ({ initialData }: PostSectionProps) => {
  const { auth } = useAuthStore();

  const infoData = useRef<{
    title: string;
    subTitle: string | null;
    oldTags: Tag[];
    newTags: string | null;
    seriesId: string | null;
    isPublished: boolean | null;
    isPinned: boolean | null;
  }>({
    title: initialData.title ?? "Untitled",
    subTitle: initialData.subTitle ?? null,
    seriesId: initialData.seriesId ?? null,
    oldTags: initialData.tags ?? [],
    newTags: null,
    isPublished: initialData.isPublished ?? null,
    isPinned: initialData.isPinned ?? null,
  });
  const content = useRef<string | null>(
    initialData.content ? initialData.content : ""
  );

  const onSubmit = () => {
    const indexStructure = generateDocumentIndexMap(content.current);

    updatePost({
      title: infoData.current.title,
      subTitle: infoData.current.subTitle,
      content: content.current,
      indexMap: JSON.stringify(indexStructure),
      newTags: infoData.current.newTags,
      isPublished: infoData.current.isPublished,
      isPinned: infoData.current.isPinned,
    });
  };

  const queryClient = useQueryClient();
  const { mutate: updatePost, isPending } = useMutation({
    mutationFn: async ({
      content,
      title,
      subTitle,
      indexMap,
      newTags,
      isPublished,
      isPinned,
    }: {
      title?: string | null;
      subTitle?: string | null;
      content?: string | null;
      indexMap?: string | null;
      newTags?: string | null;
      isPublished?: boolean | null;
      isPinned?: boolean | null;
    }) =>
      await axios.patch(`/api/documents/${initialData.id}`, {
        title,
        subTitle,
        content,
        indexMap,
        newTags,
        isPublished,
        isPinned,
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
          subTitle: infoData.current.subTitle,
          content: content.current,
          indexMap: JSON.stringify(indexStructure),
          newTags: infoData.current.newTags,
          isPublished: infoData.current.isPublished,
          isPinned: infoData.current.isPinned,
        });
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [auth, updatePost]);

  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/Editor"), {
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
      <Toolbar
        initialData={initialData}
        preview={!auth}
        onChange={(
          target:
            | "title"
            | "subTitle"
            | "seriesId"
            | "newTags"
            | "isPublished"
            | "isPinned",
          value: any
          //@ts-ignore
        ) => (infoData.current[target] = value)}
      />
      <div className="flex w-full">
        <Editor
          initialContent={initialData.content}
          editable={auth}
          onSubmit={() => {}}
          onChange={(value) => {
            content.current = value;
          }}
        />
        <div className="hidden lg:block mr-[56px]">
          <DocumentIndexCard
            postId={initialData.id}
            initialData={initialData.indexMap}
            seriesName={initialData.series?.name}
          />
        </div>
      </div>
      <Course documentId={initialData.id} seriesId={initialData.seriesId} />
      {initialData.isPublished && (
        <footer className="px-6 md:px-[56px] mt-20">
          <Giscus />
        </footer>
      )}
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
