import ModeToggle from "@/components/providers/ModeToggle";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full flex md:mx-w-2xl lg:mx-w-4xl mx-auto">
      <main className="flex-1 h-full w-full overflow-y-auto">{children}</main>
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
    </div>
  );
};

export default MainLayout;
