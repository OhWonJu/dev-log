import { checkAdmin } from "@/lib/checkAdmin";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    const isAdmin = await checkAdmin();

    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const series = await db.series.create({
      data: {
        name,
      },
    });

    return NextResponse.json(series);
  } catch (error) {
    console.log("SERIES_POST ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const simple = searchParams.get("simple");

    if (simple) {
      const serieses = await db.series.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      return NextResponse.json(serieses);
    }

    const serieses = await db.series.findMany({
      include: {
        documents: true,
      },
    });

    return NextResponse.json(serieses);
  } catch (error) {
    console.log("SERIESES_GET ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
