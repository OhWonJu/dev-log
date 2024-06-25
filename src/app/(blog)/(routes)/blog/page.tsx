"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Document } from "prisma/prisma-client";

import { Button } from "@/components/ui/button";

const BlogPage = () => {
  const route = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["posts-all"],
    queryFn: async () => axios.get("/api/documents"),
  });
  const posts = data?.data as Document[];

  const queryClient = useQueryClient();

  const { mutate: createNewPost } = useMutation({
    mutationFn: async () =>
      await axios.post("/api/documents", { title: "Untitled" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts-all"],
      });
    },
  });

  if (isLoading) return <div>laoding</div>;

  return (
    <div>
      BlogPage
      {posts.map((document: Document, index: number) => (
        <div
          key={index}
          role="button"
          onClick={() => route.push(`/blog/${document.id}`)}
        >
          {document.title}
        </div>
      ))}
      <Button onClick={() => createNewPost()}>Create new Post</Button>
    </div>
  );
};

export default BlogPage;
