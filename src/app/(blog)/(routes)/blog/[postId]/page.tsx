import React from "react";

import { DocumentWithTagsWithSeries } from "@/types";

import { env } from "@/lib/env";

import { PostSection } from "@/app/(blog)/_components";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

const getPostData = async (postId: string) => {
  const res = await fetch(`${env.SITE_URL}/api/documents/${postId}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const PostIdPage = async ({ params }: PostIdPageProps) => {
  const postData = (await getPostData(
    params.postId
  )) as DocumentWithTagsWithSeries;

  if (!postData) return <div>Post Not Found.</div>;

  return <PostSection initialData={postData} />;
};

export default PostIdPage;
