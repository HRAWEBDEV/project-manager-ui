"use client";
import { ReactNode } from "react";
import {
  type ShareDictionaryContextProps,
  ShareDictionaryContext,
} from "./shareDictionaryContext";

export default function ShareDictionaryProvider({
  children,
  ...store
}: { children: ReactNode } & ShareDictionaryContextProps) {
  return (
    <ShareDictionaryContext.Provider value={store}>
      {children}
    </ShareDictionaryContext.Provider>
  );
}
