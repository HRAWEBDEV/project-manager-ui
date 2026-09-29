"use client";
import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import { useTasksCotnext } from "../services/control/tasksControlContext";
import NoItemFound from "@/app/[lang]/(panel)/components/NoItemFound";
import TasksTable from "./TasksTable";

export default function TasksList({ dic }: { dic: TasksDictionary }) {
  const { tasksQuery } = useTasksCotnext();

  // if (tasksQuery.isSuccess && tasksQuery.data.tasks.length === 0)
  //   return (
  //     <div>
  //       <NoItemFound />
  //     </div>
  //   );

  return <TasksTable dic={dic} />;
}
