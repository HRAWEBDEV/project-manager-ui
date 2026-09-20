const activeOrganizationKey = "active-organization-slug";

function getActiveOrganization() {
  return localStorage.getItem(activeOrganizationKey);
}
function saveActiveOrganization(slug: string) {
  localStorage.setItem(activeOrganizationKey, slug);
}

export { activeOrganizationKey, getActiveOrganization, saveActiveOrganization };
