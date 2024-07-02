"use client";

import useAuthStore from "@/store/useAuthsStore";
import Link from "next/link";

const ChatListButton = () => {
  const { auth } = useAuthStore();

  if (!auth) return null;

  return (
    <div className="fixed bottom-10 left-10">
      <Link
        href={"/chats"}
        className="flex w-[55px] h-[55px] bg-symbol-500 rounded-full items-center justify-center"
      >
        <span className="font-semibold text-lg">Chat</span>
      </Link>
    </div>
  );
};

export default ChatListButton;
