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
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AiOutlineEnter } from "react-icons/ai";
import { useSlugs } from "../../hooks/useSlugs";
import { useRouter } from "next/navigation";

export default function WorkspaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { workspace, lang } = useSlugs();
  const [isOpen, setIsOpen] = useState(false);
  const {
    organizations: { activeOrganization, onChangeActiveOrganization },
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
      onChangeActiveOrganization(activeWorkspace.organizationId);
      router.replace(`/${lang}/${activeWorkspace.slug}`);
    },
    [isSuccess, data, lang, router, onChangeActiveOrganization],
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
          <div className="grow overflow-hidden pt-0 scroll-smooth flex flex-col">
            <div className="p-4 sticky top-0">
              <Field>
                <InputGroup className="h-10 bg-neutral-100 dark:bg-neutral-900">
                  <InputGroupAddon align="inline-start">
                    <FaSearch className="size-5" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="search"
                    type="search"
                    placeholder={`${workspaceDic.search} ...`}
                  />
                </InputGroup>
              </Field>
            </div>
            <div className="p-4 pt-0">
              <ul>
                {data?.workspaces.map((item) => {
                  const isActive = activeWorkspace?.slug === item.slug;
                  return (
                    <li key={item.id}>
                      <Button
                        data-active={isActive}
                        variant="outline"
                        className="w-full h-auto min-h-11 flex-col text-start items-start gap-1 font-normal py-2 pe-12 relative data-[active='true']:bg-secondary/20"
                        size="lg"
                        onClick={() => {
                          if (isActive) return;
                          onChangeActiveOrganization(item.slug);
                        }}
                      >
                        <h4 className="font-medium text-md">{item.name}</h4>
                        <p className="text-sm text-neutral-700 dark:text-neutral-400">
                          {item.description}
                        </p>
                        <div className="absolute inset-e-2 text-neutral-500/80 top-1/2 -translate-y-1/2">
                          <AiOutlineEnter className="size-8" />
                        </div>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </workspaceContext.Provider>
  );
}
