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

export default function ShortcutsWrapper() {
  const {
    shareDictionary: {
      components: { shortcuts: dic },
    },
  } = useShareDictionary();
  const { shortcuts } = useShortcutsContext();
  return (
    <div>
      <div className="mb-4">
        <div className="grid gap-2 grid-cols-1">
          <Field>
            <InputGroup className="bg-neutral-100 dark:bg-neutral-900">
              <InputGroupInput
                id="search"
                type="search"
                placeholder={dic.search + " ..."}
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
            return (
              <div key={category} className="mb-4">
                <div className="mb-2">
                  <h3 className="font-medium">{dic[typedCategory]}</h3>
                </div>
                <ul>
                  {Object.entries(categoryItems).map(([item, info]) => {
                    const typedItem = item as ShortcutsItem<
                      typeof typedCategory
                    >;
                    return (
                      <li key={typedItem} className="mb-2">
                        <Button
                          variant="outline"
                          className="w-full text-start justify-stretch h-10 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400 gap-6"
                        >
                          <span>{dic[typedItem]}</span>
                          <Kbd dir="ltr" className="bg-background">
                            {info.keys as string}
                          </Kbd>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
