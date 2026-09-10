import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";
import { type MetaDictionary } from "@/internalization/app/dictionaries/meta/dictionary";
import { type ShareDictionary } from "@/internalization/app/dictionaries/share/dictionary";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";

interface ShareDictionaryContextProps {
  shareDictionary: ShareDictionary;
  metaDictionary: MetaDictionary;
  authDictionary: AuthDictionary;
}

const ShareDictionaryContext =
  createContext<ShareDictionaryContextProps | null>(null);

function useShareDictionary(): ShareDictionaryContextProps {
  const value = use(ShareDictionaryContext);
  if (!value) throw new OutOfContext("shareDictionary");
  return value;
}

export type { ShareDictionaryContextProps };
export { ShareDictionaryContext, useShareDictionary };
