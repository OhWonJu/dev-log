import { checkAdmin } from "@/lib/checkAdmin";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { seriesId: string } }
) {
  try {
    const isAdmin = await checkAdmin();

    const { documentId } = await req.json();

    const seriesId = params.seriesId;

    if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });
    if (!seriesId)
      return new NextResponse("Series ID missing", { status: 400 });

    const existDocument = await db.document.findFirst({
      where: {
        id: documentId,
      },
    });

    if (!existDocument)
      return new NextResponse("Document not found", { status: 400 });

    const existSeries = await db.series.findFirst({
      where: { id: seriesId },
      select: {
        documents: true,
      },
    });

    const isDocumentIncluded = existSeries?.documents.find(
      (document) => document.id === existDocument.id
    );

    let series = null;

    if (isDocumentIncluded) {
      series = await db.series.update({
        where: {
          id: seriesId,
        },
        data: {
          documents: {
            disconnect: { id: existDocument.id },
          },
          updatedAt: new Date(Date.now()),
        },
      });
    } else {
      series = await db.series.update({
        where: {
          id: seriesId,
        },
        data: {
          documents: {
            connect: { id: documentId },
          },
          updatedAt: new Date(Date.now()),
        },
      });
    }

    return NextResponse.json(series);
  } catch (error) {
    console.log("SERIES_ID_PATCH -> ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { seriesId: string } }
) {
  try {
    const isAdmin = await checkAdmin();

    const seriesId = params.seriesId;

    if (!seriesId)
      return new NextResponse("Series ID missing", { status: 400 });

    const series = await db.series.findFirst({
      where: { id: seriesId },
      include: {
        documents: {
          ...(!isAdmin && {
            where: {
              isPublished: true,
            },
          }),
          select: { id: true, title: true, createdAt: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json(series);
  } catch (error) {
    console.log("SERIES_ID_GET ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
