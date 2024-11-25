import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import sitemap from "@/app/sitemap";

export async function PUT(req: Request) {
  try {
    revalidateTag("blog");

    const sitemapData = await sitemap();

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.log("BLOG_REVALIDATE ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
