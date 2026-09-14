"use client";
import { useWorkspaces } from "../hooks/useWorkspaces";
import { getSettingsIcon } from "../../services/settings/utils/getSettingsIcon";
import { Button } from "@/components/ui/button";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { FaCheck } from "react-icons/fa6";
import { useWorkspacesContext } from "../../services/workspaces/workspacesContext";

export default function WorkspacesWrapper() {
  const { activeWorksapce } = useWorkspacesContext();
  const workspacesQuery = useWorkspaces();
  const workspaceIcon = getSettingsIcon("workspace", {
    className: "size-10",
  });
  const {
    shareDictionary: {
      components: { workspaceInfo: dic },
    },
  } = useShareDictionary();
  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {workspacesQuery.data?.workspaces.map((workspace) => {
          const isActive = workspace.id === activeWorksapce.id;
          return (
            <li
              data-active={isActive}
              key={workspace.id}
              className="group relative border border-border rounded-md"
            >
              <Button
                variant="outline"
                className="absolute top-1 inset-e-1 rounded-full size-9 grid place-content-center group-data-[active='true']:bg-teal-500/10"
              >
                <FaCheck className="size-5 text-neutral-400 dark:text-neutral-600 group-data-[active='true']:text-teal-700 dark:group-data-[active='true']:text-teal-400" />
              </Button>
              <Button
                variant="outline"
                className="w-full flex-col h-auto p-2 gpa-2 items-stretch text-start border-0 pt-6"
              >
                <div className="flex flex-col gap-2 items-center mb-2 pb-2 border-b border-border">
                  <div className="text-neutral-500">{workspaceIcon}</div>
                  <p className="text-center">{workspace.name}</p>
                </div>
                <div>
                  <div>
                    <span className="text-neutral-500">
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
        })}
      </ul>
    </div>
  );
}
