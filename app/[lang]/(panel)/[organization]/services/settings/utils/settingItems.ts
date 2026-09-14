export type SettingTab = (typeof settingItems)[number]["key"];
export const settingItems = [
  {
    key: "userInfo",
  },
  {
    key: "organization",
  },
  {
    key: "workspace",
  },
  {
    key: "projects",
  },
  {
    key: "general",
  },
  {
    key: "logout",
  },
] as const;
