import React, { Suspense } from "react";

import { RecipesSection } from "@/app/(blog)/_components";

import LoadingPage from "./loading";

const RecipesPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RecipesSection type="recent" />;
    </Suspense>
  );
};

export default RecipesPage;
