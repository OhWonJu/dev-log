import { NAV_HEIGHT } from "@/constants/style";

import { Sidebar } from "./_components";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full" style={{ paddingTop: NAV_HEIGHT }}>
      <div className="relative flex h-full border-t">
        <Sidebar />
        <main className="flex-1 h-full w-full">{children}</main>
      </div>
    </div>
  );
};

export default ChatLayout;
