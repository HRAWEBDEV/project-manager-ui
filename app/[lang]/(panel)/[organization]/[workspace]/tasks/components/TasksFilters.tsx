"use client";
import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { type FilterTasksSchemas } from "../schemas/tasksSchema";
import { useFormContext } from "react-hook-form";

export default function TasksFilters({ dic }: { dic: TasksDictionary }) {
  const { register } = useFormContext<FilterTasksSchemas>();

  return (
    <header className="p-4 relative bg-background">
      <div className="grid grid-cols-[minmax(10rem,14rem)_max-content] gap-2">
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
        <Button>
          <FaPlus className="size-3" />
          {dic.filters.newTask}
        </Button>
      </div>
    </header>
  );
}
