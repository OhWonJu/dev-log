const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full md:mx-w-2xl lg:mx-w-4xl mx-auto">
      <main className="flex-1 h-full w-full">{children}</main>
    </div>
  );
};

export default BlogLayout;
