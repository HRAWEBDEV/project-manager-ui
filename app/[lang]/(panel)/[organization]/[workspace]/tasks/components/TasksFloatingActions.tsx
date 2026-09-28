import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import FilterTaskButton from "./FilterTaskButton";
import NewTaskButton from "./NewTaskButton";

export default function TasksFloatingActions({
  dic,
}: {
  dic: TasksDictionary;
}) {
  return (
    <div className="sticky bottom-0 p-2 px-4 md:hidden">
      <div className="max-w-120 mx-auto grid grid-cols-2 gap-4">
        <FilterTaskButton dic={dic} />
        <NewTaskButton dic={dic} />
      </div>
    </div>
  );
}
