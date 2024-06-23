import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const chatCode = params.chatId;

    if (!chatCode)
      return new NextResponse("Chat code missing", { status: 400 });

    const conversation = await db.conversation.findFirst({
      where: {
        chatCode,
      },
    });
    return NextResponse.json(conversation);
  } catch (error) {
    console.log("CHAT_CODE_GET ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    const { isActive } = await req.json();

    const chatId = params.chatId;

    // guard
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });
    if (!chatId) return new NextResponse("Chat ID missing", { status: 400 });

    const conversation = await db.conversation.update({
      where: {
        id: chatId,
      },
      data: {
        isActive,
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.log("CHAT_ID_PATCH ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const isAdmin = await checkAdmin();

    const chatId = params.chatId;

    // guard
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });
    if (!chatId) return new NextResponse("Chat ID missing", { status: 400 });

    if (!params.chatId)
      return new NextResponse("Chat ID missing", { status: 400 });

    const conversation = await db.conversation.delete({
      where: {
        id: chatId,
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.log("CHAT_ID_DELETE ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
