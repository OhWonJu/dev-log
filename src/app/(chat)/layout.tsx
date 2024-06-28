import { NAV_HEIGHT } from "@/constants/style";

import { SocketProvider } from "@/components/providers/SocketProvider";

import { Sidebar } from "./_components";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <div className="h-screen" style={{ paddingTop: NAV_HEIGHT }}>
        <div className="relative flex h-full border-t">
          <Sidebar />
          <main className="flex-1 h-full w-full px-4 sm:px-0">{children}</main>
        </div>
      </div>
    </SocketProvider>
  );
};

export default ChatLayout;
