import { GoogleTagManager } from "@next/third-parties/google";

import { env } from "@/lib/env";

const GTM = () => {
  if (process.env.NODE_ENV !== "production") return null;

  return <GoogleTagManager gtmId={env.GTM_KEY} />;
};

export default GTM;
