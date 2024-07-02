"use client";

import useAuthStore from "@/store/useAuthsStore";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const ChatListButton = () => {
  const { auth } = useAuthStore();

  if (!auth) return null;

  return (
    <div className="fixed bottom-5 left-5">
      <Link
        href={"/chats"}
        className="flex w-[55px] h-[55px] bg-symbol-500 rounded-full items-center justify-center"
      >
        <MessageCircle className="text-white fill-white" />
      </Link>
    </div>
  );
};

export default ChatListButton;
