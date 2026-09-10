"use client";
import { ComponentProps } from "react";
import { Sidebar } from "./Sidebar";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import SidebarLogo from "./SidebarLogo";
import SidebarHotelInfo from "./SidebarHotelInfo";
import SidebarNav from "./SidebarNav";

export default function AppSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  const { localeInfo } = useBaseConfig();
  return (
    <Sidebar
      variant="inset"
      {...props}
      side={localeInfo.contentDirection === "rtl" ? "right" : "left"}
      className="overflow-hidden p-0"
    >
      <SidebarLogo />
      <SidebarNav />
      <SidebarHotelInfo />
    </Sidebar>
  );
}
