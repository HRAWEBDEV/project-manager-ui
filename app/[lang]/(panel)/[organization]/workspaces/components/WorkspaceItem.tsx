import { Button } from "@/components/ui/button";
import { Workspace } from "../services/workspacesApiActions";
import { FaCheck } from "react-icons/fa6";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { useWorkspacesContext } from "../../[workspace]/services/workspaces/workspacesContext";
import { getSettingsIcon } from "../../[workspace]/services/settings/utils/getSettingsIcon";

export default function WorkspaceItem({
  workspace,
  onEdit,
}: {
  workspace: Workspace;
  onEdit: () => void;
}) {
  const { activeWorksapce, onChangeWorkspace } = useWorkspacesContext();
  const workspaceIcon = getSettingsIcon("workspace", {
    className: "size-10",
  });
  const {
    shareDictionary: {
      components: { workspaceInfo: dic },
    },
  } = useShareDictionary();
  const isActive = workspace.id === activeWorksapce.id;

  return (
    <li
      data-active={isActive}
      key={workspace.id}
      className="group relative border border-border rounded-md"
    >
      <Button
        variant="outline"
        className="absolute top-1 inset-e-1 rounded-full size-9 grid place-content-center group-data-[active='true']:bg-teal-500/10 z-1"
        onClick={() =>
          onChangeWorkspace(workspace.organizationSlug, workspace.slug)
        }
      >
        <FaCheck className="size-5 text-neutral-400 dark:text-neutral-600 group-data-[active='true']:text-teal-700 dark:group-data-[active='true']:text-teal-400" />
      </Button>
      <Button
        variant="outline"
        className="w-full flex-col h-auto p-2 gpa-2 items-stretch text-start border-0 pt-6"
        onClick={onEdit}
      >
        <div className="flex flex-col gap-2 items-center mb-2 pb-2 border-b border-border">
          <div className="text-neutral-500">{workspaceIcon}</div>
          <p className="text-center">{workspace.name}</p>
        </div>
        <div>
          <div className="mb-1">
            <span className="text-neutral-500 text-xs">
              {dic.organizationName}:{" "}
            </span>
            <span className="text-neutral-700 dark:text-neutral-400">
              {workspace.organizationName}
            </span>
          </div>
        </div>
      </Button>
    </li>
  );
}
