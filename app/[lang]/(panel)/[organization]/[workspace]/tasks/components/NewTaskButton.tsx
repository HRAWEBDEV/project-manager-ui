"use client";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import { useTasksCotnext } from "../services/control/tasksControlContext";

export default function NewTaskButton({ dic }: { dic: TasksDictionary }) {
  const { editTask } = useTasksCotnext();
  return (
    <Button
      onClick={() => {
        editTask.onToggleEditTask(true, null);
      }}
    >
      <FaPlus className="size-3" />
      {dic.filters.newTask}
    </Button>
  );
}
