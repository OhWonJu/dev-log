"use client";

import { useState } from "react";
import axios from "axios";

import { useModal } from "@/store/useModalStore";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const DeletePostModal = () => {
  const router = useRouter();

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deletePost";

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async () =>
      await axios.delete(`/api/documents/${data.documentId}`),
    onSuccess: () => {
      onClose();
      router.push("/blog");
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Post
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            The post will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isPending} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isPending} onClick={() => deletePost()}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostModal;
