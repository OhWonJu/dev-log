"use client";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthsStore";
import { useModal } from "@/store/useModalStore";
import { useEffect } from "react";

const ChatsPage = () => {
  const { auth } = useAuthStore();
  const { onOpen } = useModal();

  useEffect(() => {
    if (typeof auth !== "undefined" && !auth) onOpen("enterChat");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      {!auth ? (
        <Button onClick={() => onOpen("enterChat")}>채팅 입장하기</Button>
      ) : (
        <Button onClick={() => onOpen("createChat")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create a Chat
        </Button>
      )}
    </div>
  );
};

export default ChatsPage;
