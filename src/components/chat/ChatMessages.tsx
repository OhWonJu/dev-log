"use client";

import { Fragment, useRef, ElementRef, useEffect, useState } from "react";
import { Message } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
import { format } from "date-fns";

import useChatQuery from "@/hooks/useChatQuery";
import useChatSocket from "@/hooks/useChatSocket";
import useChatScroll from "@/hooks/useChatScroll";

import ChatWelcome from "./ChatWelcome";
import ChatItem from "./ChatItem";
import { useMutationState } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthsStore";
import { useSessionStorage } from "usehooks-ts";
import { NewChatProps } from "@/hooks/useNewChatMutation";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatMessagesProps {
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "chatId";
  paramValue: string;
}

const ChatMessages = ({
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const { auth } = useAuthStore();
  const [chatCode] = useSessionStorage("chat-code", "");

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const updateOMTheck = useRef<number>(0);
  const [optimisticChat, setOptimisticChat] = useState<
    { content: string; createdAt: Date; isError?: boolean }[]
  >([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });

  useChatSocket({ queryKey, addKey, updateKey });

  const { goToBottom } = useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  const pendingItems = useMutationState<any>({
    filters: { mutationKey: ["addNewChat", chatId], status: "pending" },
    select: (mutation) => mutation.state.variables,
  }) as NewChatProps[];

  const errorItems = useMutationState<any>({
    filters: { mutationKey: ["addNewChat", chatId], status: "error" },
    select: (mutation) => mutation.state.variables,
  }) as NewChatProps[];

  useEffect(() => {
    if (
      pendingItems.length > 0 &&
      pendingItems.length > updateOMTheck.current
    ) {
      setOptimisticChat((prev) => [
        ...prev,
        {
          content: pendingItems[pendingItems.length - 1].values.content,
          createdAt: pendingItems[pendingItems.length - 1].values.createdAt,
        },
      ]);

      goToBottom();
    }
    updateOMTheck.current = pendingItems.length;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingItems]);

  useEffect(() => {
    if (errorItems.length < 1) return;

    const newOMT = optimisticChat;

    errorItems.forEach((item) => {
      const index = newOMT.findIndex(
        (OMTItem) =>
          item.values.content === OMTItem.content &&
          item.values.createdAt.getTime() === OMTItem.createdAt.getTime()
      );

      if (index > -1) newOMT[index].isError = true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorItems]);

  const handleErrorChatItem = (index: number) => {
    errorItems.splice(index, 1);
    setOptimisticChat((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  useEffect(() => {
    const newChatItems = data?.pages[0].items as Message[];
    if (!newChatItems) return;
    const newChatItem = newChatItems[0];

    if (!newChatItem) return;
    if (!optimisticChat || optimisticChat.length < 1) return;
    if (auth && newChatItem.chatCode !== "---") return;
    if (!auth && newChatItem.chatCode !== chatCode) return;

    if (
      new Date(newChatItem.createdAt).getTime() !==
        optimisticChat[0].createdAt.getTime() ||
      newChatItem.content !== optimisticChat[0].content
    ) {
      const index = optimisticChat.findIndex(
        (item) =>
          item.createdAt.getTime() ===
            new Date(newChatItem.createdAt).getTime() ||
          item.content === newChatItem.content
      );

      if (index) {
        const errorOMTItems = [];

        for (let i = 0; i < index; i++) {
          if (i > index) break;
          optimisticChat[i].isError && errorOMTItems.push(optimisticChat[i]);
        }

        const newOMTItmes = [
          ...errorOMTItems,
          ...optimisticChat.slice(index + 1),
        ];

        setOptimisticChat(newOMTItmes);
        return;
      }
    }
    setOptimisticChat((prev) => prev.slice(1));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Somthing went wrong!
        </p>
      </div>
    );
  }

  return (
    <div
      ref={chatRef}
      className="flex-1 flex flex-col py-4 overflow-y-auto scrollbar-hide"
    >
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load Previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col gap-y-1">
        <div className="flex flex-col-reverse mt-auto gap-y-1">
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.items.map((message: Message) => (
                <ChatItem
                  key={message.id}
                  id={message.id}
                  chatCode={message.chatCode}
                  content={message.content}
                  deleted={message.deleted}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  isUpdated={message.updatedAt !== message.createdAt}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                />
              ))}
            </Fragment>
          ))}
        </div>
        {optimisticChat.length > 0 && (
          <div className="flex flex-col gap-y-1">
            {optimisticChat.map((chat, index) => (
              <ChatItem
                key={index}
                id={""}
                chatCode={""}
                content={chat.content}
                deleted={false}
                timestamp={format(chat.createdAt, DATE_FORMAT)}
                isUpdated={false}
                socketQuery={socketQuery}
                socketUrl={socketUrl}
                isOpitmistic={true}
                isError={chat.isError}
                errorHandler={() => handleErrorChatItem(index)}
              />
            ))}
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
