import { Tag } from "prisma/prisma-client";

import { env } from "@/lib/env";

import {
  BlogTab,
  CreatePostButton,
  Searchbar,
  Symbol,
  Tagbar,
} from "../../../_components";

const getTagsData = async () => {
  const res = await fetch(`${env.SITE_URL}/api/tags`, {});

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const BlogLayout = async ({ children }: { children: React.ReactNode }) => {
  const tagData = (await getTagsData()) as Tag[];

  return (
    <>
      <Symbol title="Recipe" />
      <aside className="toolbar flex flex-col w-full py-2 z-[999]">
        <div className="flex w-full justify-between items-center mb-5">
          <BlogTab />
          <Searchbar />
        </div>
        <Tagbar tagData={tagData} />
      </aside>
      {children}
      <CreatePostButton />
    </>
  );
};

export default BlogLayout;
