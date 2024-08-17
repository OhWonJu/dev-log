import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import axios from "axios";

import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";

const DOCUMENTS_BATCH = 12;

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

    revalidateTag("blog");
    // revalidate signal to server
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/revalidate/blog`
    );

    return NextResponse.json(documents);
  } catch (error) {
    console.log("DOCUMENTS_POST ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const cursor = searchParams.get("cursor");
    const type = searchParams.get("type") as "recent" | "pinned";

    const isAdmin = await checkAdmin();

    let documents = null;

    if (type === "recent") {
      documents = await db.document.findMany({
        ...(!isAdmin && {
          where: {
            isPublished: true,
          },
        }),
        take: DOCUMENTS_BATCH,
        ...(cursor && {
          skip: 1,
          cursor: {
            id: cursor,
          },
        }),
        select: {
          id: true,
          title: true,
          coverImage: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else if (type === "pinned") {
      documents = await db.document.findMany({
        where: {
          ...(!isAdmin && {
            isPublished: true,
          }),
          isPinned: true,
        },
        take: DOCUMENTS_BATCH,
        ...(cursor && {
          skip: 1,
          cursor: {
            id: cursor,
          },
        }),
        select: {
          id: true,
          title: true,
          coverImage: true,
          createdAt: true,
        },
      });
    } else {
      documents = await db.document.findMany({
        ...(!isAdmin && {
          where: {
            isPublished: true,
          },
        }),
        take: DOCUMENTS_BATCH,
        ...(cursor && {
          skip: 1,
          cursor: {
            id: cursor,
          },
        }),
        include: {
          series: true,
          tags: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (documents.length === DOCUMENTS_BATCH) {
      nextCursor = documents[DOCUMENTS_BATCH - 1].id;
    }

    return NextResponse.json({ items: documents, nextCursor });
  } catch (error) {
    console.log("DOCUMENTS_GET ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
