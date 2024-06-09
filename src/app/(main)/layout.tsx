import ModeToggle from "@/components/providers/ModeToggle";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex md:mx-w-2xl lg:mx-w-4xl mx-auto">
      <main className="flex-1 h-full w-full overflow-y-auto">{children}</main>
      <ModeToggle />
    </div>
  );
};

export default MainLayout;
