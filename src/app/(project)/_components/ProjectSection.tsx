"use client";

import useAuthStore from "@/store/useAuthsStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Project } from "prisma/prisma-client";
import { useEffect, useMemo, useRef } from "react";
import Header from "./Header";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { SaveButton } from "@/components";

interface ProjectSectionProps {
  initialData: Project;
}

const ProjectSection = ({ initialData }: ProjectSectionProps) => {
  const { auth } = useAuthStore();

  const newData = useRef<{
    title: string;
    description: string | null;
    images: string[] | null;
    period: string | null;
    headCount: string | null;
    stacks: string[] | null;
  }>({
    title: initialData.title,
    description: initialData.description ?? null,
    images: initialData.images ?? null,
    period: initialData.period ?? null,
    headCount: initialData.headCount ?? null,
    stacks: initialData.stacks ?? null,
  });
  const content = useRef<string | null>(
    initialData.content ? initialData.content : ""
  );

  const onSubmit = () => {
    updateProject({
      title: newData.current.title,
      description: newData.current.description,
      images: newData.current.images,
      period: newData.current.period,
      headCount: newData.current.headCount,
      stacks: newData.current.stacks,
      content: content.current,
    });
  };

  const { mutate: updateProject, isPending } = useMutation({
    mutationFn: async ({
      title,
      description,
      images,
      period,
      headCount,
      stacks,
      content,
    }: {
      title?: string;
      description?: string | null;
      images?: string[] | null;
      period?: string | null;
      headCount?: string | null;
      stacks?: string[] | null;
      content?: string | null;
    }) =>
      await axios.patch(`/api/projects/${initialData.title}`, {
        // title,
        description,
        images,
        period,
        headCount,
        stacks,
        content,
      }),
  });

  // short cut submit event handle
  useEffect(() => {
    const down = async (e: KeyboardEvent) => {
      if (!auth) return;

      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        updateProject({
          title: newData.current.title,
          description: newData.current.description,
          images: newData.current.images,
          period: newData.current.period,
          headCount: newData.current.headCount,
          stacks: newData.current.stacks,
          content: content.current,
        });
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [auth, updateProject]);

  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/editor/Editor"), {
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
      <Header
        initialData={initialData}
        preview={!auth}
        onChange={(
          target:
            | "title"
            | "description"
            | "images"
            | "period"
            | "headCount"
            | "stacks",
          value: any
          //@ts-ignore
        ) => (newData.current[target] = value)}
      />

      <div className="flex w-full">
        <Editor
          initialContent={initialData.content}
          editable={auth}
          onChange={(value) => {
            content.current = value;
          }}
        />
      </div>

      {auth && <SaveButton clickHandler={onSubmit} disabled={isPending} />}
    </div>
  );
};

export default ProjectSection;
