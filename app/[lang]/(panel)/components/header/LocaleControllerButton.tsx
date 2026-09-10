"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales } from "@/internalization/app/localization";
import { getLocaleIcon } from "@/utils/getLocaleIcons";
import { FaGlobeAsia } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";

export default function LocaleControllerButton() {
  const { localeInfo, setLocale } = useBaseConfig();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            className="relative rounded-full bg-transparent text-neutral-600 dark:text-neutral-400"
          >
            <div className="absolute top-0 -inset-e-1">
              <Badge variant="default" className="p-1 rounded-full size-5">
                {localeInfo.localeShortName}
              </Badge>
            </div>
            <FaGlobeAsia className="size-5" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {Object.values(locales).map((locale) => (
            <DropdownMenuItem
              key={locale.locale}
              className="text-neutral-700 dark:text-neutral-400 min-h-10"
              disabled={!locale.active}
              onClick={() => setLocale(locale.locale)}
            >
              {getLocaleIcon(locale.locale, {
                className: "size-5",
              })}
              <span>{locales[locale.locale].localeName}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
