"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useModal } from "@/store/useModalStore";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { generateChatCode } from "@/lib/utils";

const CreateChatModal = () => {
  const router = useRouter();

  const { isOpen, onClose, type } = useModal();

  const [code, setCode] = useState(generateChatCode());
  const [isActive, setIsActive] = useState(false);

  const isModalOpen = isOpen && type === "createChat";

  const createNewChat = async () => {
    await axios.post("/api/chats", {
      chatCode: code,
      isActive,
    });

    router.refresh();
    onClose();
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await createNewChat(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-list"],
      });
    },
  });

  const handleClose = () => {
    onClose();
  };

  const generateNewCode = () => {
    setCode(generateChatCode());
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-background p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center font-bold">
            Create New Chat
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-y-3">
          <div className="flex items-center gap-x-2">
            <span>{code}</span>
            <Button variant={"ghost"} onClick={generateNewCode}>
              <RefreshCcw className="w-5 h-5" />
            </Button>
          </div>
          <div>
            <Button
              variant={"outline"}
              onClick={() => setIsActive((prev) => !prev)}
            >
              <span>{isActive ? "Active" : "Disable"}</span>
            </Button>
          </div>
        </div>
        <DialogFooter className="px-6 py-4">
          <Button
            variant={"ghost"}
            disabled={isPending}
            onClick={() => mutate()}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatModal;
