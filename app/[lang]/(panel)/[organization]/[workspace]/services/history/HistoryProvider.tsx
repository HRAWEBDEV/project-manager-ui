"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { type HistoryContextProps, HistoryContext } from "./historyCotnext";
import { usePathname } from "next/navigation";

export default function HistoryProvider({ children }: { children: ReactNode }) {
  const [redirectCount, setRedirectCount] = useState(0);
  const firstMount = useRef(true);
  const pathname = usePathname();

  const ctx: HistoryContextProps = {
    title: "history",
    redirectCount,
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
