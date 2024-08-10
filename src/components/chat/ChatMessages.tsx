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

  const updateOMTCheck = useRef<number>(0);
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

  // pending 상태의 message varibales 를 optimisticItems 상태에 추가
  useEffect(() => {
    // 새로운 pending state varibale 생긴 경우 optmisticItems 에 해당 variable 을 추가
    if (
      pendingItems.length > 0 &&
      pendingItems.length > updateOMTCheck.current
    ) {
      // pendingItems 의 마지막 원소가 최신 pending 데이터
      setOptimisticChat((prev) => [
        ...prev,
        {
          content: pendingItems[pendingItems.length - 1].values.content,
          createdAt: pendingItems[pendingItems.length - 1].values.createdAt,
        },
      ]);
      goToBottom();
    }
    // pendingItems 는 궁극적으로 감소하므로
    // 신규 pending varibale 여부 판별을 위해 updateOMTCheck 갱신
    updateOMTCheck.current = pendingItems.length;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingItems]);

  // error 상태의 variable 값을 통해 optimistic items 내부의 item 에 erro 여부 표시
  useEffect(() => {
    if (errorItems.length < 1) return;
    if (optimisticChat.length < 1) return;

    let flag = false; // optimisticItem 갱신 여부 플레그

    const newOMT = optimisticChat;

    // 최신 error varibale 부터 탐색
    for (let i = errorItems.length - 1; i >= 0; i--) {
      // 기저 조건 가장 오래된 optimistic Item 보다 error varibale 이 오래된 경우 error 상태를 표시할 optimistic item 이 없다고 판정
      if (
        errorItems[i].values.createdAt.getTime() < newOMT[0].createdAt.getTime()
      )
        break;

      const errorItemIndex = newOMT.findIndex(
        (item) =>
          item.content === errorItems[i].values.content &&
          item.createdAt.getTime() ===
            errorItems[i].values.createdAt.getTime() &&
          !item.isError
      );

      if (errorItemIndex > -1 && !newOMT[errorItemIndex].isError) {
        flag = true;
        newOMT[errorItemIndex].isError = true;
      }
    }

    // 1개 이상의 신규 isError item 있는 경우 상태 갱신
    if (flag) {
      setOptimisticChat(newOMT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorItems]);

  const handleErrorChatItem = (index: number) => {
    setOptimisticChat((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  // 실제 데이터와 대조하여 OptimisticItem 제거
  useEffect(() => {
    const newChatItems = data?.pages[0].items as Message[];
    if (!newChatItems) return;
    // 가장 최근에 emit 된 데이터 
    const newChatItem = newChatItems[0];

    // 기저조건
    if (!newChatItem) return;
    if (!optimisticChat || optimisticChat.length < 1) return;
    // 최근 emit 메시지 데이터의 소유권 확인
    if (auth && newChatItem.chatCode !== "---") return;
    if (!auth && newChatItem.chatCode !== chatCode) return;

    // 최근 emit 데이터와 가장 오래된 optimistic 데이터가 같지 않은 경우 (emit 에 복수개의 신규 데이터가 포함된 경우)
    // Error 상태가 표시되지 않았다면, 마지막 Emit 데이터 이전의 모든 not error Optimistic item 이 정상적으로 패칭된 것으로 간주
    if (
      new Date(newChatItem.createdAt).getTime() !==
        optimisticChat[0].createdAt.getTime() ||
      newChatItem.content !== optimisticChat[0].content
    ) {
      // emit 된 가장 마지막 데이터에 해당하는 optimistic item index 획득
      const index = optimisticChat.findIndex(
        (item) =>
          item.createdAt.getTime() ===
            new Date(newChatItem.createdAt).getTime() ||
          item.content === newChatItem.content
      );

      if (index) {
        const errorOMTItems = [];

        // 획득된 인덱스 이전의 에러 데이터 분리
        for (let i = 0; i < index; i++) {
          optimisticChat[i].isError && errorOMTItems.push(optimisticChat[i]);
        }

        // 에러 데이터 + 획득된 인덱스 이후의 optimistic item 만 포함되도록  optimisticItems 갱신
        const newOMTItmes = [
          ...errorOMTItems,
          ...optimisticChat.slice(index + 1),
        ];

        setOptimisticChat(newOMTItmes);
        return;
      }
    }
    // 신규 Emit Hit
    // 신규 emit 된 데이터의 가장 최신 item 과 optimistic items 의 가장 오래된 item 같으므로
    // optimisticItems 의 첫번째 원소 제거
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
