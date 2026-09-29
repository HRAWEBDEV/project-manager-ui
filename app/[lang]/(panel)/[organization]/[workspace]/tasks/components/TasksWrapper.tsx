import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import TasksFilters from "./TasksFilters";
import TasksFloatingActions from "./TasksFloatingActions";
import TasksList from "./TasksList";

export default function TasksWrapper({ dic }: { dic: TasksDictionary }) {
  return (
    <div className="relative flex flex-col grow">
      <TasksFilters dic={dic} />
      <TasksList dic={dic} />
      <TasksFloatingActions dic={dic} />
    </div>
  );
}
