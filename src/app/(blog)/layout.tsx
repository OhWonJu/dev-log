import { NAV_HEIGHT } from "@/constants/style";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full" style={{ paddingTop: NAV_HEIGHT }}>
      <main className="relative flex-1 h-full">{children}</main>
    </div>
  );
};

export default BlogLayout;
