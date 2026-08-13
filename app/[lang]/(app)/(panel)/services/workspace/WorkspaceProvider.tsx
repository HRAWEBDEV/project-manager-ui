"use client";
import { ReactNode, useState, useEffect, useCallback } from "react";
import {
  type WorkspaceCotnextProps,
  workspaceContext,
} from "./workspaceContext";
import { useQuery } from "@tanstack/react-query";
import {
  getWorkspacesApi,
  getWorkspaces,
} from "../../workspace/services/workspaceApiActions";
import { usePanelInfo } from "../panel-info/panelInfoContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { useSlugs } from "../../hooks/useSlugs";
import { useRouter } from "next/navigation";
import WorkspaceList from "../../workspace/components/WorkspaceList";

export default function WorkspaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { workspace, lang } = useSlugs();
  const [isOpen, setIsOpen] = useState(false);
  const {
    organizations: { activeOrganization },
  } = usePanelInfo();
  const {
    shareDictionary: {
      components: { workspace: workspaceDic },
    },
  } = useShareDictionary();
  function toggleWorkspace(state?: boolean) {
    setIsOpen((pre) => (state === undefined ? !pre : state));
  }

  const { data, isLoading, isFetching, isError, isSuccess } = useQuery({
    staleTime: "static",
    enabled: !!activeOrganization,
    queryKey: [getWorkspacesApi],
    async queryFn({ signal }) {
      const res = await getWorkspaces({ signal });
      return res.data;
    },
  });

  const activeWorkspace =
    data?.workspaces.find((item) => item.slug === workspace) || null;

  const handleChangeActiveWorkspace = useCallback(
    (slug: string) => {
      if (!isSuccess || !lang) return;
      const activeWorkspace = data.workspaces.find(
        (item) => item.slug === slug,
      );
      if (!activeWorkspace) return;
      router.replace(`/${lang}/${activeWorkspace.slug}`);
    },
    [isSuccess, data, lang, router],
  );

  const ctx: WorkspaceCotnextProps = {
    isOpen,
    toggleWorkspace,
    onChangeActiveWorkspace: handleChangeActiveWorkspace,
    data: data?.workspaces,
    activeWorkspace,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  };

  useEffect(() => {
    if (!isSuccess || !!workspace || !data.workspaces.length) return;
    handleChangeActiveWorkspace(data.workspaces[0].slug);
  }, [isSuccess, workspace, handleChangeActiveWorkspace, data]);

  return (
    <workspaceContext.Provider value={ctx}>
      {children}
      <Dialog open={isOpen} onOpenChange={toggleWorkspace}>
        <DialogContent className="flex flex-col w-[min(95%,30rem)] h-[80svh] max-w-none! p-0 overflow-hidden gap-0">
          <DialogHeader className="p-4 border-b border-border">
            <DialogTitle>
              {workspaceDic.title} ({data?.workspaces.length || ""})
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="grow overflow-auto pt-0 scroll-smooth flex flex-col">
            <WorkspaceList />
          </div>
        </DialogContent>
      </Dialog>
    </workspaceContext.Provider>
  );
}
