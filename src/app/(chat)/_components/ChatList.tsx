"use client";

import { useParams, useRouter } from "next/navigation";
import { Conversation } from "prisma/prisma-client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Item from "./Item";

interface ChatListProps {
  data?: Conversation;
}

const ChatList = ({}: ChatListProps) => {
  const params = useParams();
  const router = useRouter();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["chat-list"],
    queryFn: async () => await axios.get("/api/chats"),
  });
  const chats = data?.data as Conversation[];

  const onRedirect = (chatId: string) => router.push(`/chats/${chatId}`);

  if (isLoading) {
    return <Item.Skeleton />;
  }

  return (
    <>
      {(!chats || chats.length === 0) && (
        <p className="px-3 text-sm font-medium text-muted-foreground/80 last:block">
          No chats
        </p>
      )}
      {chats &&
        chats.map((chat) => (
          <div key={chat.id}>
            <Item
              id={chat.id}
              onClick={() => onRedirect(chat.id)}
              label={chat.chatCode}
              focus={params?.chatId === chat.id}
              active={chat.isActive}
            />
          </div>
        ))}
    </>
  );
};

export default ChatList;
