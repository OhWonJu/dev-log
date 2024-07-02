"use client";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Giscus() {
  const pathName = usePathname();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const theme = resolvedTheme === "dark" ? "noborder_gray" : "light";

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "OhWonJu/dev-log");
    scriptElem.setAttribute("data-repo-id", "R_kgDOMG4pNQ");
    scriptElem.setAttribute("data-category", "Comments");
    scriptElem.setAttribute("data-category-id", "DIC_kwDOMG4pNc4CgiAc");
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", theme); // noborder_gray
    scriptElem.setAttribute("data-lang", "ko");
    scriptElem.setAttribute("data-loading", "lazy");

    ref.current.appendChild(scriptElem);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }, [theme, mounted]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { term: pathName } } },
      "https://giscus.app"
    );
  }, [pathName]);

  return <section ref={ref} />;
}
