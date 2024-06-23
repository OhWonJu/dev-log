import { ChatInput, ChatMessages } from "@/components/chat";
import { db } from "@/lib/db";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const chat = await db.conversation.findFirst({
    where: {
      id: params.chatId,
    },
  });

  if (!chat)
    return (
      <div className="max-w-xl mx-auto flex flex-col justify-center items-center h-full">
        <span className="font-semibold">채팅 코드가 유효하지 않습니다.</span>
      </div>
    );

  if (!chat.isActive)
    return (
      <div className="max-w-xl mx-auto flex flex-col justify-center items-center h-full">
        <span className="font-semibold">아직 채팅이 시작되지 않았습니다.</span>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto flex flex-col h-full">
      <ChatMessages
        chatId={chat.id}
        apiUrl="/api/messages"
        paramKey="chatId"
        paramValue={chat.id}
        socketUrl="/api/socket/messages"
        socketQuery={{
          chatId: chat.id,
          chatCode: chat.chatCode,
        }}
      />
      <ChatInput
        apiUrl="/api/socket/messages"
        query={{
          chatId: chat.id,
          chatCode: chat.chatCode,
        }}
      />
    </div>
  );
};

export default ChatIdPage;
