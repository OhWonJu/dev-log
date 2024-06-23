"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/store/useModalStore";

const EnterChatButton = () => {
  const { onOpen } = useModal();

  return (
    <Button variant={"outline"} onClick={() => onOpen("enterChat")}>
      Chat with me
    </Button>
  );
};

export default EnterChatButton;
