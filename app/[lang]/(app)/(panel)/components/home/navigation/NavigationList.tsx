import { navItems } from "../../../utils/navItems";
import { getNavItemIcon } from "../../../utils/getNavItemIcon";
import { Button } from "@/components/ui/button";
import { useShareDictionary } from "@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext";
import Link from "next/link";

function NavigationItems({ item }: { item: (typeof navItems)[number] }) {
  const {
    shareDictionary: {
      components: { navigation: navigationDic },
    },
  } = useShareDictionary();
  return (
    <li>
      <Button
        variant="ghost"
        className="w-full justify-start min-h-12 text-neutral-600 dark:text-neutral-400 gap-4"
        asChild
      >
        <Link href="#">
          {getNavItemIcon(item.title, { className: "size-7" })}
          <span className="font-medium">{navigationDic[item.title]}</span>
        </Link>
      </Button>
    </li>
  );
}
function NavigationList() {
  return (
    <div>
      <ul className="p-2 grid gap-1">
        {navItems.map((item) => (
          <NavigationItems key={item.title} item={item} />
        ))}
      </ul>
    </div>
  );
}

export { NavigationList };
