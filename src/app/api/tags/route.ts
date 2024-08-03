import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const tags = await db.tag.findMany({
      orderBy: {
        tagName: "asc",
      },
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.log("TASS_GET ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
