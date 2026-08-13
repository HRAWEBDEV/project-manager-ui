"use client";
import { useState } from "react";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AiOutlineEnter } from "react-icons/ai";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { useWorkspaceContext } from "../../services/workspace/workspaceContext";
import NoItemFound from "../../../components/NoItemFound";
import Highlighter from "react-highlight-words";

export default function WorkspaceList() {
  const [searchedWorkspace, setSearchedWorkspace] = useState("");
  const { data, activeWorkspace, onChangeActiveWorkspace } =
    useWorkspaceContext();
  const {
    shareDictionary: {
      components: { workspace: workspaceDic },
    },
  } = useShareDictionary();

  const visibleItems = data
    ? data.filter((item) => item.name.includes(searchedWorkspace))
    : [];

  return (
    <>
      <div className="p-4 sticky top-0 grid grid-cols-[1fr_max-content]">
        <Field>
          <InputGroup className="h-10 bg-neutral-100 dark:bg-neutral-900">
            <InputGroupAddon align="inline-start">
              <FaSearch className="size-5" />
            </InputGroupAddon>
            <InputGroupInput
              id="search"
              type="search"
              placeholder={`${workspaceDic.search} ...`}
              value={searchedWorkspace}
              onChange={(e) => setSearchedWorkspace(e.target.value)}
            />
            <InputGroupAddon align="inline-end" className="-me-3">
              <Button
                size="lg"
                className="h-10 rounded-ss-none rounded-es-none"
              >
                {workspaceDic.addWorkspace}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </div>
      <div className="p-4 pt-0">
        <ul>
          {visibleItems.length === 0 ? (
            <NoItemFound />
          ) : (
            visibleItems.map((item) => {
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
                      onChangeActiveWorkspace(item.slug);
                    }}
                  >
                    <h4 className="font-medium text-md">
                      <Highlighter
                        searchWords={[searchedWorkspace]}
                        textToHighlight={item.name}
                      />
                    </h4>
                    <p className="text-sm text-neutral-700 dark:text-neutral-400">
                      {item.description}
                    </p>
                    <div className="absolute inset-e-2 text-neutral-500/80 top-1/2 -translate-y-1/2">
                      <AiOutlineEnter className="size-8" />
                    </div>
                  </Button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}
