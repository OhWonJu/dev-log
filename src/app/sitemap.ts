import type { MetadataRoute } from "next";

import { db } from "@/lib/db";
import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = env.SITE_URL ?? "https://dev-recipe.life";

  // Google's limit is 50,000 URLs per sitemap //
  const posts = await db.document.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const postList = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: "daily" as
      | "daily"
      | "yearly"
      | "always"
      | "hourly"
      | "weekly"
      | "monthly"
      | "never"
      | undefined,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...postList,
  ];
}
