"use client";
import { ReactNode } from "react";
import { type TasksContextProps, TasksContext } from "./tasksControlContext";
import { type TasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FilterTasksSchemas,
  createFilterTasksSchema,
} from "../../schemas/tasksSchema";

export default function TasksControlProvider({
  children,
  dic,
}: {
  children: ReactNode;
  dic: TasksDictionary;
}) {
  // filters shcema
  const tasksFitlerUseForm = useForm<FilterTasksSchemas>({
    resolver: zodResolver(createFilterTasksSchema()),
    defaultValues: {
      search: "",
    },
  });

  const ctx: TasksContextProps = {
    title: "control",
  };
  return (
    <TasksContext.Provider value={ctx}>
      <FormProvider {...tasksFitlerUseForm}>{children}</FormProvider>
    </TasksContext.Provider>
  );
}
