import Link from "next/link";
import { Document, Series, Tag } from "prisma/prisma-client";

import { env } from "@/lib/env";

import {
  Card,
  Header,
  PostCreateButton,
  TagItem,
  Tags,
} from "../../_components";

export const dynamic = "force-dynamic";

type BlogData = {
  pinnedDocuments: Document[];
  recentDocuments: Document[];
  serieses: Series[];
  tags: Tag[];
};

const getBlogInitData = async () => {
  const res = await fetch(`${env.SITE_URL}/api/blog`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const BlogPage = async () => {
  const { pinnedDocuments, recentDocuments, serieses, tags } =
    (await getBlogInitData()) as BlogData;

  return (
    <div className="p-8 lg:p-0">
      <Header title="Recipe" />
      <div className="flex flex-col-reverse gap-y-12 lg:gap-y-0 lg:flex-row">
        <div className="lg:flex-[3.3] lg:mr-12">
          {/* Pinned Posts */}
          <section className="flex flex-col mb-24">
            <Link href={"/blog/recipes?type=pinned"}>
              <h2
                role="button"
                className="text-4xl font-bold text-zinc-600 dark:text-zinc-300 mr-4 mb-6"
              >
                Signature Recipes
              </h2>
            </Link>
            <div className="flex-1 grid md:grid-cols-3 gap-3 h-full">
              {pinnedDocuments.map((document) => (
                <Card
                  key={document.id}
                  cardType="post"
                  id={document.id}
                  title={document.title}
                  coverImage={document.coverImage}
                  createdAt={document.createdAt}
                />
              ))}
            </div>
          </section>
          {/* Recent Posts */}
          <section className="flex flex-col mb-24">
            <Link href={"/blog/recipes?type=recent"}>
              <h2
                role="button"
                className="text-4xl font-bold text-zinc-600 dark:text-zinc-300 mr-4 mb-6"
              >
                Recent Recipes
              </h2>
            </Link>
            <div className="flex-1 grid md:grid-cols-3 gap-6 md:gap-3 h-full">
              {recentDocuments.map((document) => (
                <Card
                  key={document.id}
                  cardType="post"
                  id={document.id}
                  title={document.title}
                  coverImage={document.coverImage}
                  createdAt={document.createdAt}
                />
              ))}
            </div>
          </section>
          {/* Series */}
          <section className="flex flex-col mb-24">
            <Link href={"/blog/coures"}>
              <h2
                role="button"
                className="text-4xl font-bold text-zinc-600 dark:text-zinc-300 mr-4 mb-6"
              >
                Course
              </h2>
            </Link>
            <div className="flex-1 grid md:grid-cols-3 gap-6 md:gap-3 h-full">
              {serieses.map((series) => (
                <Card
                  key={series.id}
                  cardType="series"
                  id={series.id}
                  title={series.name}
                />
              ))}
            </div>
          </section>
        </div>
        {/* Tags */}
        <Tags tags={tags} />
      </div>
      <PostCreateButton />
    </div>
  );
};

export default BlogPage;
