"use client";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { MdErrorOutline } from "react-icons/md";
import { IoReloadOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

export default function SomethingWentWrong({
  tryAgain,
}: {
  tryAgain?: () => unknown;
}) {
  const {
    shareDictionary: {
      components: { somethingWentWrong: dic },
    },
  } = useShareDictionary();
  return (
    <div>
      <div className="flex flex-col items-center p-4 text-neutral-500">
        <MdErrorOutline className="size-14 mb-4 text-destructive" />
        <div className="text-center text-destructive">
          <h3 className="text-lg font-medium mb-1">{dic.title}</h3>
          <p className="text-md font-medium mb-4">{dic.description}</p>
          {!!tryAgain && (
            <Button size="icon-lg" variant="ghost" onClick={() => tryAgain()}>
              <IoReloadOutline className="size-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
