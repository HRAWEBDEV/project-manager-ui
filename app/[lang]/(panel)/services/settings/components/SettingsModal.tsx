"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSettingsContext } from "../settingsContext";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { Button } from "@/components/ui/button";
import { settingItems } from "../utils/settingItems";
import { getSettingsIcon } from "../utils/getSettingsIcon";

export default function SettingsModal() {
  const { open, toggleOpen, setShowConfirmlogout } = useSettingsContext();
  const {
    shareDictionary: {
      components: { settings: dic },
    },
  } = useShareDictionary();
  return (
    <Dialog open={open} onOpenChange={(state) => toggleOpen(state)}>
      <DialogContent className="p-0 gap-0 sm:max-w-xl h-[85dvh] max-h-160 flex flex-col overflow-hidden">
        <DialogHeader className="border-b border-border p-4">
          <DialogTitle>{dic.title}</DialogTitle>
          <DialogDescription className="hidden">{dic.title}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:grid sm:grid-cols-[11rem_1fr] grow overflow-hidden">
          <div className="bg-neutral-100 dark:bg-neutral-800 overflow-auto flex sm:flex-col">
            {settingItems.map((item) => (
              <Button
                variant="ghost"
                key={item.key}
                data-logout={item.key === "logout"}
                className="text-start justify-stretch rounded-none font-normal text-neutral-700 dark:text-neutral-400 data-[logout='true']:text-destructive h-11"
                onClick={() => {
                  if (item.key === "logout") {
                    setShowConfirmlogout(true);
                    return;
                  }
                }}
              >
                {getSettingsIcon(item.key, { className: "size-5" })}
                <span>{dic[item.key]}</span>
              </Button>
            ))}
          </div>
          <div className="overflow-auto grow"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
