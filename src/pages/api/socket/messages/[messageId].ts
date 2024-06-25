import { NextApiRequest } from "next";

import { db } from "@/lib/db";
import { NextApiResponseServerIO } from "@/types";
import { checkAdmin } from "@/lib/checkAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not aloowd" });
  }

  try {
    const isAdmin = await checkAdmin();

    const { messageId, chatId, chatCode } = req.query;
    const { content } = req.body;

    if (!isAdmin || !chatCode)
      return res.status(401).json({ error: "Unauthorized" });
    if (!chatId)
      return res.status(400).json({ error: "Conversation Id missing" });

    const conversation = await db.conversation.findFirst({
      where: {
        id: chatId as string,
      },
    });

    if (!conversation) return res.status(400).json({ error: "Chat not found" });

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        conversationId: chatId as string,
      },
    });

    if (!message || message.deleted)
      return res.status(404).json({ error: "Message not found" });

    const isMessageOwner =
      (!isAdmin && message.chatCode === chatCode) || isAdmin;
    const canModify = isMessageOwner;

    if (!canModify) return res.status(404).json({ error: "Unauthorized" });

    if (req.method === "DELETE") {
      message = await db.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          content: "This message has been deleted.",
          deleted: true,
        },
      });
    }

    if (req.method === "PATCH") {
      if (!isMessageOwner) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      message = await db.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          content,
        },
      });
    }

    const updateKey = `chat:${chatId}:messages:update`;
    res?.socket.server?.io?.emit(updateKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("MESSAGE_ID ->", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}