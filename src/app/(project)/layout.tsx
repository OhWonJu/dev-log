import { NAV_HEIGHT } from "@/constants/style";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full flex" style={{ paddingTop: NAV_HEIGHT }}>
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};
export default ProjectLayout;
