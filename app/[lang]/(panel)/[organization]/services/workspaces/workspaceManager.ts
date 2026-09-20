const activeWorkspaceKey = "active-workspace-slug";

function getActiveWorkspace() {
  return localStorage.getItem(activeWorkspaceKey);
}
function saveActiveWorkspace(slug: string) {
  localStorage.setItem(activeWorkspaceKey, slug);
}

export { activeWorkspaceKey, getActiveWorkspace, saveActiveWorkspace };
