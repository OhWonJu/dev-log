import React, { Suspense } from "react";

import { RecipesSection } from "@/app/(blog)/_components";

import LoadingPage from "../loading";

const RecentRecipesPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RecipesSection type="pinned" />
    </Suspense>
  );
};

export default RecentRecipesPage;
