import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";

export default function NewProjectButton({
  dic,
  onCreate,
}: {
  dic: ProjectsDictionary;
  onCreate: () => unknown;
}) {
  return (
    <Button onClick={onCreate}>
      <FaPlus className="size-3" />
      {dic.filters.createProject}
    </Button>
  );
}
