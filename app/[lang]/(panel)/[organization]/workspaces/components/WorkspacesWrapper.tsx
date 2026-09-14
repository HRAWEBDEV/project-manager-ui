"use client";
import { useState } from "react";
import { useWorkspaces } from "../hooks/useWorkspaces";
import { Button } from "@/components/ui/button";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FaSearch, FaPlus } from "react-icons/fa";
import WorkspaceItem from "./WorkspaceItem";
import EditWorkspaceDialog from "./EditWorkspaceDialog";
import NoItemFound from "../../../components/NoItemFound";
import { type Workspace } from "../services/workspacesApiActions";

export default function WorkspacesWrapper() {
  const [search, setSearch] = useState("");
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const workspacesQuery = useWorkspaces();
  const {
    shareDictionary: {
      components: { workspaceInfo: dic },
    },
  } = useShareDictionary();

  const visibleWorkspaces = search
    ? workspacesQuery.data?.workspaces.filter((item) =>
        item.name.includes(search),
      ) || []
    : workspacesQuery.data?.workspaces || [];

  return (
    <>
      <div>
        <div className="mb-4 grid gap-2 grid-cols-[1fr_max-content]">
          <Field>
            <InputGroup className="bg-neutral-100 dark:bg-neutral-900">
              <InputGroupInput
                id="search"
                type="search"
                placeholder={dic.search + " ..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <FaSearch className="size-4" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Button
            onClick={() => {
              setEditingWorkspace(null);
              setDialogOpen(true);
            }}
          >
            <FaPlus className="size-3" />
            {dic.newWorkspace}
          </Button>
        </div>
        {visibleWorkspaces.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleWorkspaces.map((workspace) => {
              return (
                <WorkspaceItem
                  key={workspace.id}
                  workspace={workspace}
                  onEdit={() => {
                    setEditingWorkspace(workspace);
                    setDialogOpen(true);
                  }}
                />
              );
            })}
          </ul>
        ) : (
          <div>
            <NoItemFound searchedText={search} />
          </div>
        )}
      </div>
      <EditWorkspaceDialog
        workspace={editingWorkspace}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
