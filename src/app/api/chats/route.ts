import { NextResponse } from "next/server";
import {} from "@prisma/client";

import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";

export async function POST(req: Request) {
  try {
    const isAdmin = await checkAdmin();
    const { chatCode, isActive } = await req.json();

    if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });

    const conversation = await db.conversation.create({
      data: {
        chatCode,
        isActive,
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.log("CHAT_POST ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const isAdmin = await checkAdmin();

    if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });

    const conversations = await db.conversation.findMany({
      select: {
        id: true,
        chatCode: true,
        isActive: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.log("CHAT_GET ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
