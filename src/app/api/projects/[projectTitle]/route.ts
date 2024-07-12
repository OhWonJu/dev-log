import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";
import { processTags } from "@/lib/utils";

export async function GET(
  req: Request,
  { params }: { params: { projectTitle: string } }
) {
  try {
    const projectTitle = params.projectTitle;

    if (!projectTitle)
      return new NextResponse("Project Title missing", { status: 400 });

    const project = await db.project.findFirst({
      where: {
        title: projectTitle,
      },
    });

    if (!project) return new NextResponse("Project Not Found", { status: 400 });

    return NextResponse.json(project);
  } catch (error) {
    console.log("PROJECT_TITLE ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { projectTitle: string } }
) {
  try {
    const isAdmin = await checkAdmin();

    const { title, description, images, period, headCount, stacks, content } =
      await req.json();

    const projectTitle = params.projectTitle;

    // guard
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });
    if (!projectTitle)
      return new NextResponse("Project Title missing", { status: 400 });

    const project = await db.project.update({
      where: {
        title: projectTitle,
      },
      data: {
        title,
        description,
        images,
        period,
        headCount,
        stacks,
        content,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("PROJECT_ID_PATCH ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { projectTitle: string } }
) {
  try {
    const isAdmin = await checkAdmin();

    const projectTitle = params.projectTitle;

    // guard
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });
    if (!projectTitle)
      return new NextResponse("Project Title missing", { status: 400 });

    const existingProject = await db.project.findFirst({
      where: {
        title: projectTitle,
      },
    });

    if (!existingProject)
      return new NextResponse("Document Not Found", { status: 400 });

    const project = await db.project.delete({
      where: { title: projectTitle },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("PROJECT_ID_DELETE ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
