"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { type HistoryContextProps, HistoryContext } from "./historyContext";
import { usePathname, useSearchParams } from "next/navigation";
import { COMEBACK_QUERY_KEY } from "./utils/comebackQuery";

export default function HistoryProvider({ children }: { children: ReactNode }) {
  const [redirectCount, setRedirectCount] = useState(0);
  const firstMount = useRef(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activePath = pathname.split("/")[4] || "home";

  function handleComeback(orRedirect: () => unknown) {
    const shouldComeback = searchParams.get(COMEBACK_QUERY_KEY);
    if (redirectCount <= 2 || shouldComeback !== "true") {
      orRedirect();
      return;
    }
    history.back();
  }

  const ctx: HistoryContextProps = {
    title: "history",
    redirectCount,
    activePath,
    onComeback: handleComeback,
  };
  useEffect(() => {
    firstMount.current = false;
    if (firstMount.current) return;
    setRedirectCount((pre) => pre + 1);
  }, [pathname]);
  return (
    <HistoryContext.Provider value={ctx}>{children}</HistoryContext.Provider>
  );
}
