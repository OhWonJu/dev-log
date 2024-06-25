import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";

const DOCUMENTS_BATCH = 5;

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const isAdmin = await checkAdmin();

    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const documents = await db.document.create({
      data: {
        title,
        isPublished: false,
        isPinned: false,
      },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.log("DOCUMENTS_POST ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const recent = searchParams.get("recent"); // boolean
    const pinned = searchParams.get("pinned"); // boolean
    const series = searchParams.get("series"); // seriesId

    const isAdmin = await checkAdmin();

    if (recent) {
      const documents = await db.document.findMany({
        where: {
          isPublished: true,
        },
        take: DOCUMENTS_BATCH,
        skip: 0,
        include: {
          series: true,
          tags: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(documents);
    }

    if (pinned) {
      const documents = await db.document.findMany({
        where: {
          isPublished: true,
          isPinned: true,
        },
        take: DOCUMENTS_BATCH,
        skip: 0,
        include: {
          series: true,
          tags: true,
        },
      });

      return NextResponse.json(documents);
    }

    if (series) {
      const documents = await db.document.findMany({
        where: {
          seriesId: series,
          isPublished: true,
        },
        include: {
          series: true,
          tags: true,
        },
      });

      return NextResponse.json(documents);
    }

    const documents = await db.document.findMany({
      // where: {
      //   isPublished: !isAdmin && true,
      // },
      take: DOCUMENTS_BATCH,
      skip: 0,
      include: {
        series: true,
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.log("DOCUMENTS_GET ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
