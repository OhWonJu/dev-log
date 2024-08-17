import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";
import { processTags } from "@/lib/utils";
import { revalidatePath, revalidateTag } from "next/cache";

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
      newTags,
      seriesId,
    } = await req.json();

    const documentId = params.documentId;

    // guard
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });
    if (!documentId)
      return new NextResponse("Document ID missing", { status: 400 });

    let oldTagIds = null;
    if (typeof newTags === "string") {
      const documentExist = await db.document.findFirst({
        where: { id: documentId },
        select: {
          tags: true,
        },
      });

      oldTagIds = documentExist?.tags.map((tag) => ({
        id: tag.id,
      }));
    }

    const document = await db.document.update({
      where: {
        id: documentId,
      },
      data: {
        ...(typeof title === "string" && {
          title: title.trim() === "" ? "Untitled" : title,
        }),
        ...(typeof subTitle === "string" && { subTitle: subTitle }),
        ...(typeof isPublished === "boolean" && { isPublished: isPublished }),
        ...(typeof isPinned === "boolean" && { isPinned: isPinned }),
        ...(content && { content: content }),
        coverImage: coverImage,
        ...(indexMap && { indexMap: indexMap }),
        ...(oldTagIds && {
          tags: {
            disconnect: oldTagIds,
            connectOrCreate: processTags(newTags),
          },
        }),
        ...(seriesId && { seriesId: seriesId }),
      },
    });

    if (document.id) {
      if (oldTagIds && oldTagIds.length !== 0) {
        const tags = await Promise.all(
          oldTagIds.map(
            async (tag) =>
              await db.tag.findFirst({
                where: { id: tag.id },
                select: {
                  id: true,
                  documents: { select: { id: true } },
                },
              })
          )
        );
        // filter callback안에서 await을 사용하면, callback은 항상 promise를 반환합니다. promise는 항상 'truthy'
        // promise를 밖에서 해결..
        const noDocuments = oldTagIds.filter((tagId, index) => {
          const tag = tags[index];
          if (tag?.documents.length === 0) {
            return tagId.id;
          } else {
            return null;
          }
        });
        await db.tag.deleteMany({ where: { OR: noDocuments } });
      }
    }

    revalidateTag(documentId);
    // revalidate signal to server
    await fetch(
      `$${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/revalidate/post}`,
      {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({ documentId }),
      }
    );

    if (typeof title === "string") {
      revalidatePath("/blog");
      // revalidate signal to server
      await fetch(
        `$${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/revalidate/blog}`,
        {
          method: "POST",
          cache: "no-cache",
        }
      );
    }

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
    if (!documentId)
      return new NextResponse("Document ID missing", { status: 400 });

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

    revalidatePath("/blog");
    // revalidate signal to server
    await fetch(
      `$${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/revalidate/blog}`,
      {
        method: "POST",
        cache: "no-cache",
      }
    );

    return NextResponse.json(document);
  } catch (error) {
    console.log("DOCUMENT_ID_DELETE ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
