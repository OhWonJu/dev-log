import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const keyword = searchParams.get("keyword");

    const isAdmin = await checkAdmin();

    if (!keyword) return NextResponse.json([]);

    const documents = await db.document.findMany({
      where: {
        ...(!isAdmin && { isPublished: true }),
        ...(keyword && { title: { contains: keyword } }),
      },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.log("DOCUMENTS_SEARCH ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
