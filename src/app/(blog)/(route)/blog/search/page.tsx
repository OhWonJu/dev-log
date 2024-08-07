import { Suspense } from "react";

import { SearchSection } from "@/app/(blog)/_components";

import LoadingPage from "../(tabs)/loading";

export const dynamic = "force-dynamic";

const SearchPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SearchSection />
    </Suspense>
  );
};

export default SearchPage;
