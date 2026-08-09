"use client";
import { Button } from "@/components/ui/button";
import { navItems } from "../../utils/navItems";
import { getNavItemIcon } from "../../utils/getNavItemIcon";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";

export default function Tabs() {
  const {
    shareDictionary: {
      components: { navigation: navigationDic },
    },
  } = useShareDictionary();
  return (
    <div className='bg-background fixed bottom-0 inset-s-0 inset-e-0 flex sm:hidden h-(--panel-tabs-height) z-(--panel-tabs-zindex) border-t border-border transition-transform in-data-[scroll-dicretion="down"]:translate-y-20'>
      <ul className="flex grow">
        {navItems.map((nav) => (
          <li
            key={nav.title}
            className="shrink-0 basis-0 grow not-last:border-e border-border"
          >
            <Button
              variant="ghost"
              className="w-full h-full flex-col gap-1 text-neutral-600 dark:text-neutral-400"
            >
              {getNavItemIcon(nav.title, { className: "size-6" })}
              <span className="text-sm">{navigationDic[nav.title]}</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
