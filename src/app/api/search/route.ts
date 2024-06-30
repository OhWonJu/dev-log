import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const keyword = searchParams.get("keyword");
    const tags = searchParams.get("tags");

    const isAdmin = await checkAdmin();

    if (keyword !== "null") {
      const documents = await db.document.findMany({
        where: {
          ...(!isAdmin && { isPublished: true }),
          ...(keyword && { title: { contains: keyword } }),
        },
      });

      return NextResponse.json(documents);
    }

    if (tags !== "null") {
      const tagsArray = tags?.split("-") as string[];

      const documents = await db.document.findMany({
        where: {
          ...(!isAdmin && { isPublished: true }),
          tags: {
            some: {
              tagName: { in: tagsArray.map((t) => t) },
            },
          },
        },
      });

      return NextResponse.json(documents);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.log("DOCUMENTS_SEARCH ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
