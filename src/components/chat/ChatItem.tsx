"use client";

import React, { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionStorage } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import useAuthStore from "@/store/useAuthsStore";
import { useModal } from "@/store/useModalStore";

import ActionTooltip from "../ActionTooltip";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ChatItemProps {
  id: string;
  chatCode?: string | null;
  content: string;
  timestamp: string;
  deleted: boolean;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatItem = ({
  id,
  chatCode,
  content,
  timestamp,
  deleted,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const { onOpen } = useModal();

  const { auth } = useAuthStore();
  const [value] = useSessionStorage("chat-code", "");

  // const isOwner = chatCode ? chatCode === value : auth; // chat code -> gest, if not admin
  const isOwner = auth ? !chatCode || chatCode === "---" : chatCode === value;

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);
      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [content, form]);

  const canDeleteMessage = isOwner || auth;
  const canEditMessage = isOwner;

  return (
    <div
      className={cn(
        isOwner && "flex-row-reverse",
        "relative flex transition w-full"
      )}
    >
      <div
        className={cn(
          isOwner
            ? "bg-symbol-500 bg-opacity-50 text-white"
            : "bg-zinc-200 text-black",
          "relative group flex items-center hover:bg-black/5 p-4 rounded-md"
        )}
      >
        <div className="group flex gap-x-2 items-start w-full">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-2">
              <span className="text-xs">{timestamp}</span>
            </div>
            <p className={cn("text-sm", deleted && "italic text-xs mt-1")}>
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2">(edited)</span>
              )}
            </p>
            {isEditing && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex items-center w-full gap-x-2 pt-2"
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              disabled={isLoading}
                              placeholder="Edited message"
                              {...field}
                              className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:right-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button disabled={isLoading} size="sm">
                    Save
                  </Button>
                </form>
                <span className="text-[10px] mt-1 text-zinc-400">
                  Press escape to cancel, enter to save
                </span>
              </Form>
            )}
          </div>
        </div>
        {canDeleteMessage && (
          <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
            {canEditMessage && (
              <ActionTooltip label="Edit">
                <Edit
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                />
              </ActionTooltip>
            )}
            <ActionTooltip label="Delete">
              <Trash
                onClick={() =>
                  onOpen("deleteMessage", {
                    apiUrl: `${socketUrl}/${id}`,
                    query: socketQuery,
                  })
                }
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
