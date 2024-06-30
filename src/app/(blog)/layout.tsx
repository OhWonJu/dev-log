import { SearchCommand } from "@/components";
import { NAV_HEIGHT } from "@/constants/style";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full" style={{ paddingTop: NAV_HEIGHT }}>
      <SearchCommand />
      <main className="relative flex-1 h-full w-screen md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default BlogLayout;
