import React, { Suspense } from "react";

import { CoursesSection } from "@/app/(blog)/_components";

import LoadingPage from "../loading";

export const dynamic = "force-dynamic";

const CoursePage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CoursesSection />
    </Suspense>
  );
};

export default CoursePage;
