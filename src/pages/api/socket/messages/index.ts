import { NextApiRequest } from "next";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import axios from "axios";

import { NextApiResponseServerIO } from "@/types";
import { db } from "@/lib/db";
import { checkAdmin } from "@/lib/checkAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const isAdmin = await checkAdmin();

  const { content } = req.body;
  const { chatId, chatCode } = req.query;

  // 로컬에서 메시지 emit 편법 ㅠㅠ
  if (process.env.NODE_ENV === "development" && isAdmin) {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/socket/messages?chatId=${chatId}&chatCode=---`,
      {
        content,
      }
    );

    return res.status(200).json(data.data);
  }

  try {
    if (!isAdmin && !chatCode)
      return res.status(401).json({ error: "Unauthorized" });
    if (!chatId)
      return res.status(400).json({ error: "Conversation ID missing" });
    if (!content) return res.status(400).json({ error: "Content missing" });

    const conversation = await db.conversation.findFirst({
      where: {
        id: chatId as string,
      },
    });

    if (!conversation)
      return res.status(400).json({ error: "Conversation not found" });

    const message = await db.message.create({
      data: {
        content,
        chatCode: !isAdmin ? (chatCode as string) : "",
        conversationId: chatId as string,
      },
    });

    // unique socket key
    const chatKey = `chat:${chatId}:messages`;

    res?.socket?.server?.io?.emit(chatKey, message);

    return res.status(200).json(message);
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log("DIRECT_MESSAGES_POST ->", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
