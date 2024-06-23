"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useModal } from "@/store/useModalStore";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSessionStorage } from "usehooks-ts";
import useAuthStore from "@/store/useAuthsStore";
import { Conversation } from "prisma/prisma-client";

const formSchema = z.object({
  chatCode: z.string().min(1, { message: "채팅 코드를 입력해주새요." }),
});

const EnterChatModal = () => {
  const router = useRouter();
  const [_, setValue] = useSessionStorage("chat-code", "");
  const { setAuth } = useAuthStore();

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "enterChat";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chatCode: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await axios.get(`/api/chats/${values.chatCode}`);
      const chat = data.data as Conversation;

      if (!chat) throw new Error("Chat code invalied");

      setValue(() => chat.chatCode);
      setAuth(false);

      form.reset();
      router.push(`/chats/${chat.id}`);
      onClose();
    } catch (error) {
      form.setError("chatCode", {message: "유효하지 않은 채팅 코드 입니다."})
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            채팅 입장하기
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="chatCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Chat code
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="채팅 코드를 입력해주세요."
                        {...field}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading}>입장하기</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EnterChatModal;
