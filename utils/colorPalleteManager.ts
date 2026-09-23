import { appColorTemplates } from "@/app/utils/appTemplates";

const activeColorPalleteKey = "active-color-pallete";

function isColorPalleteValid(
  item: string | null,
): item is (typeof appColorTemplates)[number] {
  if (!item) return false;
  return appColorTemplates.includes(item as (typeof appColorTemplates)[number]);
}

function getActiveColorPallete(): (typeof appColorTemplates)[number] | null {
  const savedItem = localStorage.getItem(activeColorPalleteKey);
  if (!isColorPalleteValid(savedItem)) return null;
  return savedItem;
}

function saveActiveColorPallete(
  newColorPallete: (typeof appColorTemplates)[number],
): void {
  localStorage.setItem(activeColorPalleteKey, newColorPallete);
}

export {
  activeColorPalleteKey,
  isColorPalleteValid,
  getActiveColorPallete,
  saveActiveColorPallete,
};
