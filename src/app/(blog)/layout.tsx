import { Metadata } from "next";

import { SearchCommand } from "@/components";
import { NAV_HEIGHT } from "@/constants/style";

export const metadata: Metadata = {
  title: "Blog | Recipe",
  description: "Dev Recipes",
};

const BlogLayout = ({
  children,
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
}) => {
  return (
    <div className="flex h-full" style={{ paddingTop: NAV_HEIGHT }}>
      <SearchCommand />
      <main className="relative flex-1 h-full w-screen md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto px-6 lg:px-0">
        {children}
      </main>
    </div>
  );
};

export default BlogLayout;
