const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
      <main className="flex-1 h-full w-full">{children}</main>
    </div>
  );
};

export default MainLayout;
