import { CreateProjectButton } from "../../_components";
import ProjectList from "../../_components/ProjectList";

const ProjectPage = async () => {
  return (
    <div className="p-8 lg:p-0">
      <ProjectList />
      <CreateProjectButton />
    </div>
  );
};

export default ProjectPage;
