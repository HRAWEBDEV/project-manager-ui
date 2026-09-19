import { Button } from "@/components/ui/button";
import { navigationItems } from "../../../utils/navigationItems";
import { getNavigationIcon } from "../../../utils/getNavigationIcon";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { useOrganizationContext } from "../../organization/organizationContext";
import { useWorkspacesContext } from "../../../[organization]/[workspace]/services/workspaces/workspacesContext";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import Link from "next/link";

export default function SidebarNav() {
  const { activeOrganization } = useOrganizationContext();
  const { activeWorksapce } = useWorkspacesContext();
  const { locale } = useBaseConfig();
  const {
    shareDictionary: {
      components: { navigation: dic },
    },
  } = useShareDictionary();
  const basePath = `/${locale}/${activeOrganization.slug}/${activeWorksapce.slug}`;
  return (
    <div className="w-full grow overflow-auto">
      <div className="flex flex-col">
        {navigationItems.map((item, i) => {
          return (
            <Button
              data-active={i === 1}
              variant="ghost"
              key={item.type}
              className="h-auto text-start text-neutral-600 dark:text-neutral-300 justify-stretch min-h-11 gap-3 hover:bg-neutral-200 dark:hover:border-b-neutral-700 data-[active='true']:bg-primary data-[active='true']:text-primary-foreground rounded-sm"
              render={
                <Link href={`${basePath}/${item.path}`}>
                  {getNavigationIcon(item.type, { className: "size-5" })}
                  <span className="font-medium">{dic[item.type]}</span>
                </Link>
              }
            ></Button>
          );
        })}
      </div>
    </div>
  );
}
