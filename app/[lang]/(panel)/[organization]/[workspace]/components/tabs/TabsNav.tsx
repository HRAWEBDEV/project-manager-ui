"use client";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { BREAK_POINTS } from "@/utils/breakPoints";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { navigationItems } from "@/app/[lang]/(panel)/utils/navigationItems";
import { getNavigationIcon } from "@/app/[lang]/(panel)/utils/getNavigationIcon";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { useWorkspacesContext } from "@/app/[lang]/(panel)/[organization]/services/workspaces/workspacesContext";
import { useOrganizationContext } from "@/app/[lang]/(panel)/services/organization/organizationContext";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { useHistoryContext } from "../../services/history/historyContext";
import Link from "next/link";

export default function TabsNav() {
  const isMatched = useMatchMedia({ breakPoint: BREAK_POINTS.md });
  const { locale } = useBaseConfig();
  const { activeOrganization } = useOrganizationContext();
  const { activeWorkspace } = useWorkspacesContext();
  const { activePath } = useHistoryContext();
  const {
    shareDictionary: {
      components: { navigation: dic },
    },
  } = useShareDictionary();
  const basePath = `/${locale}/${activeOrganization.slug}/${activeWorkspace.slug}`;
  return (
    <>
      {isMatched ? (
        <nav className="fixed bottom-0 inset-e-0 inset-s-0">
          <Tabs value={activePath}>
            <TabsList className="w-full rounded-none h-auto!">
              {navigationItems
                .filter((item) => item.showTab)
                .map((item) => (
                  <TabsTrigger
                    key={item.type}
                    value={item.type}
                    className="basis-0 grow flex-col h-auto gap-px p-px"
                    render={
                      <Link href={`${basePath}/${item.path}`}>
                        {getNavigationIcon(item.type, {
                          className: "size-5",
                        })}
                        <span className="text-sm">{dic[item.type]}</span>
                      </Link>
                    }
                  ></TabsTrigger>
                ))}
            </TabsList>
          </Tabs>
        </nav>
      ) : null}
    </>
  );
}
