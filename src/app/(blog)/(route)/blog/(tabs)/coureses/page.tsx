import React, { Suspense } from "react";

import { CouresesSection } from "@/app/(blog)/_components";

import LoadingPage from "../loading";

export const dynamic = "force-dynamic";

const CoursePage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CouresesSection />
    </Suspense>
  );
};

export default CoursePage;
