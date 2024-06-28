import { Card } from "@/app/(blog)/_components";
import { env } from "@/lib/env";
import { SeriesWithDocuments } from "@/types";

import { Document } from "prisma/prisma-client";

interface PostIdPageProps {
  params: {
    seriesId: string;
  };
}

const getSeriesData = async (seriesId: string) => {
  const res = await fetch(`${env.SITE_URL}/api/series/${seriesId}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const SeriesIdPage = async ({ params }: PostIdPageProps) => {
  const seriesData = (await getSeriesData(
    params.seriesId
  )) as SeriesWithDocuments;

  if (!seriesData) return <div>Coures Not Found.</div>;

  return (
    <section className="flex flex-col p-8 lg:p-0 mb-24">
      <h1
        role="banner"
        className="text-5xl font-bold text-zinc-600 dark:text-zinc-300 mr-4 mb-12"
      >
        Course - {seriesData.name}
      </h1>
      <div className="flex-1 grid md:grid-cols-3 lg:grid-cols-4 gap-3 h-full">
        {seriesData.documents.map((post: Document) => (
          <Card
            key={post.id}
            id={post.id}
            cardType="post"
            title={post.title}
            coverImage={post.coverImage}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </section>
  );
};

export default SeriesIdPage;
