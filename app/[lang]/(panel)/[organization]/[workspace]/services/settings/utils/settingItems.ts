export type SettingTab = (typeof settingItems)[number]["key"];
export const settingItems = [
  {
    key: "userInfo",
  },
  {
    key: "notifications",
  },
  {
    key: "organization",
  },
  {
    key: "organizationMembers",
  },
  {
    key: "workspace",
  },
  {
    key: "myWorkspaces",
  },
  {
    key: "shortcuts",
  },
  {
    key: "userInterface",
  },
  {
    key: "logout",
  },
] as const;
