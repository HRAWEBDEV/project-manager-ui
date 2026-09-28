import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import TasksFilters from "./TasksFilters";

export default function TasksWrapper({ dic }: { dic: TasksDictionary }) {
  return (
    <div className="relative">
      <TasksFilters dic={dic} />
    </div>
  );
}
