export type SettingTab = (typeof settingItems)[number]["key"];
export const settingItems = [
  {
    key: "userInfo",
  },
  {
    key: "myInvitations",
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
    key: "workspaceMembers",
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
