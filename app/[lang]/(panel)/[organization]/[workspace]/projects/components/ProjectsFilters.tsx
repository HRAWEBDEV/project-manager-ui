import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { type FilterProjectsSchemas } from "../schemas/projectsSchemas";
import { useProjectsContext } from "../services/control/projectsContext";

export default function ProjectsFilters({
  dic,
  onCreate,
}: {
  dic: ProjectsDictionary;
  onCreate: () => void;
}) {
  const { register } = useFormContext<FilterProjectsSchemas>();
  const { visibleProjects } = useProjectsContext();

  return (
    <div className="mb-4">
      <div className="grid grid-cols-[minmax(10rem,20rem)_max-content] gap-2">
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
        <Button onClick={onCreate}>
          <FaPlus className="size-3" />
          {dic.filters.createProject}
        </Button>
      </div>
      <div className="mt-0.5">
        <div className="text-xs">
          <span className="text-neutral-500">{dic.filters.results}: </span>
          <span className="text-neutral-700 dark:text-neutral-400">
            {visibleProjects.length}
          </span>
        </div>
      </div>
    </div>
  );
}
