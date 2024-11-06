const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-full max-w-screen mx-auto">
      <main className="w-full relative overflow-x-clip">{children}</main>
    </div>
  );
};

export default MainLayout;
