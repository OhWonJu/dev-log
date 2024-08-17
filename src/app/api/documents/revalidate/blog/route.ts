import { NextResponse } from "next/server";

import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    revalidatePath("/blog");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.log("BLOG_REVALIDATE ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
