import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  const documentId = params.documentId;

  try {
    revalidateTag(documentId);

    return NextResponse.json({
      revalidated: true,
      documentId,
      now: Date.now(),
    });
  } catch (error) {
    console.log("POST_REVALIDATE ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
