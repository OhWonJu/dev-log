import { NextResponse } from "next/server";

import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { documentId } = await req.json();

  try {
    revalidateTag(documentId);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.log("POST_REVALIDATE ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
