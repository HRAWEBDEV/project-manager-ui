import { Button } from "@/components/ui/button";
import { navigationItems } from "../../../utils/navigationItems";
import { getNavigationIcon } from "../../../utils/getNavigationIcon";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";

export default function SidebarNav() {
  const {
    shareDictionary: {
      components: { navigation: dic },
    },
  } = useShareDictionary();
  return (
    <div className="w-full grow overflow-auto">
      <div className="flex flex-col">
        {navigationItems.map((item, i) => {
          return (
            <Button
              data-active={i === 1}

              variant="ghost"
              key={item.type}
              className="h-auto text-start justify-stretch min-h-14 gap-3 hover:bg-neutral-200 dark:hover:border-b-neutral-700 data-[active='true']:bg-primary data-[active='true']:text-primary-foreground"
            >
              {getNavigationIcon(item.type, { className: "size-6" })}
              <span className="font-medium">{dic[item.type]}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
