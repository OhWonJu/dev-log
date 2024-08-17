import React from "react";
import type { Metadata } from "next";

import { DocumentWithTagsWithSeries } from "@/types";
import { env } from "@/lib/env";

import { PostSection } from "@/app/(blog)/_components";

export const dynamic = "force-static";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

const getPostData = async (postId: string) => {
  const res = await fetch(`${env.SITE_URL}/api/documents/${postId}`, {
    cache: "force-cache",
    next: { tags: [postId] },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export async function generateMetadata({
  params,
}: PostIdPageProps): Promise<Metadata> {
  const id = params.postId;

  const post = (await getPostData(id)) as DocumentWithTagsWithSeries;

  return {
    title: `${post.title} | Recipe`,
    description: post.subTitle ?? post.title,
    keywords: post.tags.map((tag) => tag.tagName),
    creator: "Pio",
    openGraph: {
      title: `${post.title} | Recipe`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL!}/blog/${id}`,
      description: post.subTitle ?? post.title,
      locale: "ko-KR",
      type: "article",
      images: [post.coverImage ?? "/recipe.svg"],
    },
  };
}

const PostIdPage = async ({ params }: PostIdPageProps) => {
  const postData = (await getPostData(
    params.postId
  )) as DocumentWithTagsWithSeries;

  if (!postData) return <div>Post Not Found.</div>;

  return <PostSection initialData={postData} />;
};

export default PostIdPage;
