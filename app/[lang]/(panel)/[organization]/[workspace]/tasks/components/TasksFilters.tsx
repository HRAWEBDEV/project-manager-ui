"use client";
import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FaSearch } from "react-icons/fa";
import { type FilterTasksSchemas } from "../schemas/tasksSchema";
import { useFormContext, Controller } from "react-hook-form";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { useProjects } from "../../projects/hooks/useProjects";
import { Project } from "../../projects/services/projectsApiActions";
import NewTaskButton from "./NewTaskButton";
import FilterTaskButton from "./FilterTaskButton";

export default function TasksFilters({ dic }: { dic: TasksDictionary }) {
  const { register, control } = useFormContext<FilterTasksSchemas>();
  const projectsQuery = useProjects();
  const {
    shareDictionary: {
      components: { noItemFound },
    },
  } = useShareDictionary();

  return (
    <header className="p-4 bg-background sticky top-0">
      <div className="grid grid-cols-2 md:grid-cols-[max-content_minmax(8rem,14rem)_minmax(8rem,14rem)_max-content] gap-2">
        <div className="hidden md:flex">
          <FilterTaskButton dic={dic} />
        </div>
        <Field>
          <InputGroup className="bg-neutral-100 dark:bg-neutral-900">
            <InputGroupInput
              id="search"
              type="search"
              placeholder={dic.filters.search + " ..."}
              {...register("search")}
            />
            <InputGroupAddon align="inline-end">
              <FaSearch className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Controller
          name="project"
          control={control}
          render={({ field: { value, onChange, ref, ...other } }) => (
            <Combobox
              items={projectsQuery.data?.projects || []}
              value={value}
              onValueChange={(val) => {
                onChange(val);
              }}
              itemToStringLabel={(op) => op.name}
              isItemEqualToValue={(item, val) => {
                return item.id === val.id;
              }}
              inputRef={ref}
              {...other}
            >
              <ComboboxInput
                showClear
                placeholder={dic.filters.project}
                className="bg-neutral-100 dark:bg-neutral-900"
              />
              <ComboboxContent>
                <ComboboxEmpty>{noItemFound.title}</ComboboxEmpty>
                <ComboboxList>
                  {(item: Project) => (
                    <ComboboxItem key={item.id} value={item}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          )}
        />
        <div className="hidden md:flex">
          <NewTaskButton dic={dic} />
        </div>
      </div>
    </header>
  );
}
