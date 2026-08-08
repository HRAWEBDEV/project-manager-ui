"use client";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { Sidebar } from "./Sidebar";
import { ComponentProps } from "react";
import { NavigationList } from "./NavigationList";

export default function AppSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  const { localeInfo } = useBaseConfig();
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      side={localeInfo.contentDirection === "rtl" ? "right" : "left"}
      {...props}
    >
      <NavigationList />
    </Sidebar>
  );
}
