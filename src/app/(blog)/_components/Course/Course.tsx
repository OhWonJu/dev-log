"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import { ListMinus } from "lucide-react";

import { SeriesWithDocuments } from "@/types";
import { cn } from "@/lib/utils";

interface CourseProps {
  documentId: string;
  seriesId?: string | null;
}

const Course = ({ documentId, seriesId }: CourseProps) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["serise-list", seriesId],
    queryFn: async () => await axios.get(`/api/series/${seriesId}`),
    enabled: !!seriesId,
  });
  const seriesData = data?.data as SeriesWithDocuments;

  const handleItemClick = (id: string) => {
    router.push(`/blog/${id}`);
  };

  if (!seriesData) return null;

  if (!seriesData.documents.find((document) => document.id === documentId))
    return null;

  return (
    <aside id="course" className="px-[56px] mt-20">
      <div className="flex flex-col flex-grow border shadow-md bg-secondary rounded-md p-4">
        <div className="flex items-center mb-4 ">
          <h4 className="font-semibold text-2xl mr-4 truncate">
            Course - {seriesData.name}
          </h4>
          <a className="flex items-center text-xs font-medium text-zinc-400 dark:text-zinc-600">
            <ListMinus className="w-3 h-3 mr-1" />
            {seriesData.documents.findIndex(
              (document) => document.id === documentId
            ) + 1}{" "}
            / {seriesData.documents.length}
          </a>
        </div>
        <ul className="">
          {seriesData.documents.map((document, index) => (
            <li
              key={document.id}
              role="button"
              onClick={() => handleItemClick(document.id)}
              className={cn(
                "px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-300 truncate",
                document.id === documentId && "font-bold"
              )}
            >
              {index + 1}. {document.title}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Course;