import { OutOfContext } from "@/utils/OutOfContext";
import { createContext, use } from "react";
import { useTasks } from "../../hooks/useTasks";

interface TasksContextProps {
  title: "control";
  tasksQuery: ReturnType<typeof useTasks>;
  editTask: {
    selectedTaskId: string | null;
    onToggleEditTask: (state: boolean, id: string | null) => unknown;
  };
}

const TasksContext = createContext<TasksContextProps | null>(null);

function useTasksCotnext() {
  const val = use(TasksContext);
  if (!val) throw new OutOfContext("tasks context");
  return val;
}
export type { TasksContextProps };
export { TasksContext, useTasksCotnext };
