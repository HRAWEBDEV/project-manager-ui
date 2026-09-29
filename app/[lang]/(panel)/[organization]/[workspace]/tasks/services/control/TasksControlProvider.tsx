"use client";
import { ReactNode, useMemo, useState } from "react";
import { type TasksContextProps, TasksContext } from "./tasksControlContext";
import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FilterTasksSchemas,
  createFilterTasksSchema,
} from "../../schemas/tasksSchema";
import { useTasks } from "../../hooks/useTasks";
import EditTaskDialog from "../../components/edit-task/EditTaskDialog";

export default function TasksControlProvider({
  children,
  dic,
}: {
  children: ReactNode;
  dic: TasksDictionary;
}) {
  const [showEditTask, setShowEditTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  // filters shcema
  const tasksFitlerUseForm = useForm<FilterTasksSchemas>({
    resolver: zodResolver(createFilterTasksSchema()),
    defaultValues: {
      search: "",
      project: null,
    },
  });

  function handleToggleEditTask(state: boolean, id: string | null) {
    setShowEditTask(state);
    if (!state) {
      setSelectedTaskId(null);
    } else {
      setSelectedTaskId(id);
    }
  }

  const tasksQuery = useTasks();
  const selectedEditTask = useMemo(() => {
    if (
      !selectedTaskId ||
      !tasksQuery.isSuccess ||
      !tasksQuery.data.tasks.length
    )
      return null;
    return (
      tasksQuery.data.tasks.find((item) => item.id === selectedTaskId) || null
    );
  }, [selectedTaskId, tasksQuery.isSuccess, tasksQuery.data]);

  const editTask: TasksContextProps["editTask"] = {
    selectedTaskId,
    onToggleEditTask: handleToggleEditTask,
  };

  const ctx: TasksContextProps = {
    title: "control",
    tasksQuery,
    editTask,
  };
  return (
    <TasksContext.Provider value={ctx}>
      <FormProvider {...tasksFitlerUseForm}>{children}</FormProvider>
      <EditTaskDialog
        open={showEditTask}
        onOpenChange={(state) => {
          handleToggleEditTask(state, null);
        }}
        taskInfo={selectedEditTask}
        dic={dic}
      />
    </TasksContext.Provider>
  );
}
