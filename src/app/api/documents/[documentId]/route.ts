import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";

export async function GET(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    const documentId = params.documentId;

    if (!documentId)
      return new NextResponse("Document ID missing", { status: 400 });

    const document = await db.document.findFirst({
      where: {
        id: documentId,
      },
      include: {
        series: true,
        tags: true,
      },
    });

    if (!document)
      return new NextResponse("Document Not Found", { status: 400 });

    if (!isAdmin && !document.isPublished)
      return new NextResponse("Unauthorized", { status: 401 });

    return NextResponse.json(document);
  } catch (error) {
    console.log("DOCUMENT_ID ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  try {
    const isAdmin = await checkAdmin();

    const {
      title,
      subTitle,
      isPublished,
      isPinned,
      content,
      coverImage,
      indexMap,
    } = await req.json();

    console.log(title, content);

    const documentId = params.documentId;

    // guard
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });
    if (!documentId)
      return new NextResponse("Document ID missing", { status: 400 });

    const document = await db.document.update({
      where: {
        id: documentId,
      },
      data: {
        title,
        subTitle,
        isPublished,
        isPinned,
        content,
        coverImage,
        indexMap,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.log("DOCUMENT_ID_PATCH ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  try {
    const isAdmin = await checkAdmin();

    const documentId = params.documentId;

    // guard
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });
    if (!documentId) return new NextResponse("Pot ID missing", { status: 400 });

    const existingPost = await db.document.findFirst({
      where: {
        id: documentId,
      },
    });

    if (!existingPost)
      return new NextResponse("Document Not Found", { status: 400 });

    const document = await db.document.delete({
      where: { id: documentId },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.log("DOCUMENT_ID_DELETE ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
