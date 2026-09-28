import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import NewProjectButton from "./NewProjectButton";

export default function ProjectsFloatingActions({
  dic,
  onCreate,
}: {
  dic: ProjectsDictionary;
  onCreate: () => unknown;
}) {
  return (
    <div className="sticky bottom-0 p-2 px-4 md:hidden">
      <div className="max-w-80 mx-auto grid grid-cols-1 gap-4">
        <NewProjectButton
          dic={dic}

          onCreate={onCreate}
        />
      </div>
    </div>
  );
}
