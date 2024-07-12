import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Project } from "prisma/prisma-client";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { env } from "@/lib/env";

const getProjectInitData = async () => {
  const res = await fetch(`${env.SITE_URL}/api/projects`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const ProjectList = async () => {
  const projectData = (await getProjectInitData()) as Project[];

  return (
    <BentoGrid className="mt-10 w-full">
      {projectData.map((project, index) => (
        <Link key={project.title} href={`/project/${project.title}`}>
          <BentoGridItem
            className={index === 3 || index === 6 ? "md:col-span-2" : ""}
            title={project.title}
            description={
              <p className="text-sm text-left break-words outline-none whitespace-pre-line line-clamp-4">
                {project.description}
              </p>
            }
            header={
              <div
                className={cn(
                  "relative w-full aspect-square rounded-t-xl overflow-hidden"
                )}
              >
                <Image
                  src={project.images[0]}
                  fill
                  alt="project-image"
                  className="object-cover"
                />
              </div>
            }
          />
        </Link>
      ))}
    </BentoGrid>
  );
};

export default ProjectList;
