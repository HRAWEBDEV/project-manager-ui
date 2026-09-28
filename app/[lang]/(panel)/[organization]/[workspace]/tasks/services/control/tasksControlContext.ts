import { OutOfContext } from "@/utils/OutOfContext";
import { createContext, use } from "react";

interface TasksContextProps {
  title: "control";
}

const TasksContext = createContext<TasksContextProps | null>(null);

function useTasksCotnext() {
  const val = use(TasksContext);
  if (!val) throw new OutOfContext("tasks context");
  return val;
}
export type { TasksContextProps };
export { TasksContext, useTasksCotnext };
