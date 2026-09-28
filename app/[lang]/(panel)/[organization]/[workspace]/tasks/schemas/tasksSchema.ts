import { z } from "zod";

function createFilterTasksSchema() {
  return z.object({
    search: z.string(),
    project: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .nullable(),
  });
}

type FilterTasksSchemas = z.infer<ReturnType<typeof createFilterTasksSchema>>;

export type { FilterTasksSchemas };
export { createFilterTasksSchema };
