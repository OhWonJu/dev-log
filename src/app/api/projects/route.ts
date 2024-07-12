import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const isAdmin = await checkAdmin();

    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const projects = await db.project.create({
      data: {
        title,
      },
      select: {
        createdAt: true,
        description: true,
        headCount: true,
        images: true,
        period: true,
        stacks: true,
        title: true,
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.log("PROJECTS_POST ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const projects = await db.project.findMany({});

    return NextResponse.json(projects);
  } catch (error) {
    console.log("PROJECTS_GET ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
