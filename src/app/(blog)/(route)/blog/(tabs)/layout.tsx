import {
  BlogTab,
  CreatePostButton,
  Searchbar,
  Symbol,
} from "../../../_components";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Symbol title="Recipe" />
      <aside className="toolbar flex flex-col w-full py-2 z-[999]">
        <div className="flex w-full justify-between items-center mb-10">
          <BlogTab />
          <Searchbar />
        </div>
      </aside>
      {children}
      <CreatePostButton />
    </>
  );
};

export default BlogLayout;
