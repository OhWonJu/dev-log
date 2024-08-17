"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Tag } from "prisma/prisma-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { DocumentWithTagsWithSeries } from "@/types";
import { generateDocumentIndexMap } from "@/lib/utils";
import useAuthStore from "@/store/useAuthsStore";

import { Skeleton } from "@/components/ui/skeleton";
import { SaveButton } from "@/components";

import Toolbar from "./Toolbar";
import Course from "./Course";
import Giscus from "./Giscus";
import DocumentIndexCard from "./DocumentIndexCard";

interface PostSectionProps {
  initialData: DocumentWithTagsWithSeries;
}

interface PostSchema {
  title?: string | null;
  subTitle?: string | null;
  oldTags?: Tag[] | null;
  newTags?: string | null;
  seriesId?: string | null;
  isPublished?: boolean | null;
  isPinned?: boolean | null;
  content?: string | null;
  indexMap?: string | null;
}

const PostSection = ({ initialData }: PostSectionProps) => {
  const { auth } = useAuthStore();

  const infoData = useRef<Omit<PostSchema, "content" | "indexMap">>({
    title: null,
    subTitle: null,
    seriesId: null,
    oldTags: null,
    newTags: null,
    isPublished: null,
    isPinned: null,
  });
  const content = useRef<string | null>(null);

  const { mutate: updatePost, isPending } = useMutation({
    mutationFn: async ({
      content,
      title,
      subTitle,
      indexMap,
      newTags,
      isPublished,
      isPinned,
    }: PostSchema) =>
      await axios.patch(`/api/documents/${initialData.id}`, {
        title,
        subTitle,
        content,
        indexMap,
        newTags,
        isPublished,
        isPinned,
      }),
    onSuccess: () => {
      infoData.current = {
        title: null,
        subTitle: null,
        seriesId: null,
        oldTags: null,
        newTags: null,
        isPublished: null,
        isPinned: null,
      };
      content.current = null;
    },
  });

  const onSubmit = () => {
    if (isPending) return;

    const indexStructure = generateDocumentIndexMap(content.current);

    if (
      content.current === null &&
      Object.values(infoData.current).every((value) => value === null)
    ) {
      console.log("Post not changed");
      return;
    }

    updatePost({
      title: infoData.current.title,
      subTitle: infoData.current.subTitle,
      content: content.current,
      indexMap: indexStructure ? JSON.stringify(indexStructure) : null,
      newTags: infoData.current.newTags,
      isPublished: infoData.current.isPublished,
      isPinned: infoData.current.isPinned,
    });
  };

  // short cut submit event handle
  useEffect(() => {
    const down = async (e: KeyboardEvent) => {
      if (!auth) return;

      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/editor/Editor"), {
        ssr: false,
        loading: () => (
          <div className="w-full">
            <div className="space-y-4 pt-[78px]">
              <Skeleton className="h-16 w-[60%] sm:w-[30%]" />
              <Skeleton className="h-6 w-[100%] sm:w-[50%]" />
              <Skeleton className="h-6 w-[80%] sm:w-[40%]" />
              <Skeleton className="h-6 w-[100%] sm:w-[50%]" />
              <Skeleton className="h-6 w-[60%] sm:w-[60%]" />
              <Skeleton className="h-6 w-[80%] sm:w-[40%]" />
              <Skeleton className="h-6 w-[40%] sm:w-[20%]" />
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
        <footer className="px-0 md:px-[56px] mt-20">
          <Giscus />
        </footer>
      )}
      {auth && <SaveButton clickHandler={onSubmit} disabled={isPending} />}
    </div>
  );
};

export default PostSection;
