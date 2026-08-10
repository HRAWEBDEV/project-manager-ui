import { navItems } from "../../../utils/navItems";
import { getNavItemIcon } from "../../../utils/getNavItemIcon";
import { Button } from "@/components/ui/button";
import { useShareDictionary } from "@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { usePanelInfo } from "../../../services/panel-info/panelInfoContext";
import WorkspaceController from "../../WorkspaceController";

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
  const {
    userInfo: { isLoading },
  } = usePanelInfo();
  return (
    <div>
      <div className="p-2">
        <WorkspaceController
          variant="outline"
          className="w-full h-11 mb-2 bg-neutral-200 dark:bg-neutral-800 text-start"
        />
        <ul className="pt-0 grid gap-1">
          {navItems.map((item) =>
            isLoading ? (
              <Skeleton key={item.title} className="h-12" />
            ) : (
              <NavigationItems key={item.title} item={item} />
            ),
          )}
        </ul>
      </div>
    </div>
  );
}

export { NavigationList };
