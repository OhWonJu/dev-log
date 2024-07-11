import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { Project } from "prisma/prisma-client";

import { env } from "@/lib/env";
import { ProjectSection } from "@/app/(project)/_components";

interface ProjectTitlePageProps {
  params: { projectTitle: string };
}

const getProjectData = async (projectTitle: string) => {
  const res = await fetch(`${env.SITE_URL}/api/projects/${projectTitle}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
};

export async function generateMetadata(
  { params }: ProjectTitlePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = params.projectTitle;

  const project = (await getProjectData(title)) as Project;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${project.title} | Project`,
    description: project.description ?? project.title,
    creator: "Pio",
    openGraph: {
      title: `${project.title} | Project`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL!}/project/${title}`,
      description: project.description ?? project.title,
      locale: "ko-KR",
      type: "article",
      images: [project.images[1] ?? "/recipe.svg", ...previousImages],
    },
  };
}

const ProjectTitlePage = async ({ params }: ProjectTitlePageProps) => {
  const projectData = (await getProjectData(params.projectTitle)) as Project;

  if (!projectData) return <div>Project Not Found.</div>;

  return <ProjectSection initialData={projectData} />;
};

export default ProjectTitlePage;
