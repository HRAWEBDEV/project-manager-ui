import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";

interface HistoryContextProps {
  title: "history";
  redirectCount: number;
  activePath: string;
  onComeback: (orRedirect: () => unknown) => void;
}

const HistoryContext = createContext<HistoryContextProps | null>(null);

function useHistoryContext() {
  const val = use(HistoryContext);
  if (!val) throw new OutOfContext("HistoryContext");
  return val;
}

export type { HistoryContextProps };
export { HistoryContext, useHistoryContext };
