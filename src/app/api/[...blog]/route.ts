import { NextResponse } from "next/server";

import { checkAdmin } from "@/lib/checkAdmin";
import { db } from "@/lib/db";

const DOCUMENTS_LIMIT = 6;

export async function GET(req: Request) {
  const isAdmin = await checkAdmin();

  try {
    const [pinnedDocuments, recentDocuments, serieses, tags] =
      await db.$transaction([
        db.document.findMany({
          where: {
            ...(!isAdmin && { isPublished: true }),
            isPinned: true,
          },
          take: DOCUMENTS_LIMIT,
          select: {
            id: true,
            title: true,
            coverImage: true,
            isPinned: true,
            isPublished: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        db.document.findMany({
          ...(!isAdmin && {
            where: {
              isPublished: true,
            },
          }),
          take: DOCUMENTS_LIMIT,
          select: {
            id: true,
            title: true,
            coverImage: true,
            isPublished: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        db.series.findMany({
          take: DOCUMENTS_LIMIT,
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        }),
        db.tag.findMany({
          select: { id: true, tagName: true },
          orderBy: { tagName: "asc" },
        }),
      ]);

    return NextResponse.json({
      pinnedDocuments,
      recentDocuments,
      serieses,
      tags,
    });
  } catch (error) {
    console.log("BLOG_GET ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
