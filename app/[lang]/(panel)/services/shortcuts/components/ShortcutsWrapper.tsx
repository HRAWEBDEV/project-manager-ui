"use client";
import { useState } from "react";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FaSearch } from "react-icons/fa";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { useShortcutsContext } from "../shortcutsContext";
import {
  type ShortcutsCategory,
  type ShortcutsItem,
} from "../shortcutsManager";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import NoItemFound from "../../../components/NoItemFound";

export default function ShortcutsWrapper() {
  const [searchText, setSearchText] = useState("");
  const {
    shareDictionary: {
      components: { shortcuts: dic },
    },
  } = useShareDictionary();
  const { shortcuts } = useShortcutsContext();

  return (
    <div className="pt-0 p-4">
      <div className="py-4 sticky top-0 bg-background">
        <div className="grid gap-2 grid-cols-1">
          <Field>
            <InputGroup className="bg-neutral-100 dark:bg-neutral-900">
              <InputGroupInput
                id="search"
                type="search"
                placeholder={dic.search + " ..."}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <FaSearch className="size-4" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>
      </div>
      <div>
        <div>
          {Object.entries(shortcuts).map(([category, categoryItems]) => {
            const typedCategory = category as ShortcutsCategory;
            if (typedCategory === "static") return null;
            const categoryItemsList = Object.entries(categoryItems);
            const visibleItemsList = searchText
              ? categoryItemsList.filter(([item]) => {
                  const typedItem = item as ShortcutsItem<typeof typedCategory>;
                  return dic[typedItem].includes(searchText);
                })
              : categoryItemsList;
            if (visibleItemsList.length === 0) return null;
            return (
              <div key={category} className="mb-4 data-[show='false']:hidden">
                <div className="mb-2">
                  <h3 className="font-medium">{dic[typedCategory]}</h3>
                </div>
                <ul>
                  {visibleItemsList.map(([item, info]) => {
                    const typedItem = item as ShortcutsItem<
                      typeof typedCategory
                    >;
                    return (
                      <li key={typedItem} className="mb-2">
                        <Button
                          variant="outline"
                          className="w-full text-start justify-stretch h-10 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400 gap-6 grid grid-cols-2"
                        >
                          <span>{dic[typedItem]}</span>
                          <div>
                            <Kbd dir="ltr" className="bg-background">
                              {info.keys as string}
                            </Kbd>
                          </div>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div className="last:hidden first:block!">
            <NoItemFound searchedText={searchText} />
          </div>
        </div>
      </div>
    </div>
  );
}
