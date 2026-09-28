import { z } from "zod";

function createFilterTasksSchema() {
  return z.object({
    search: z.string(),
  });
}

type FilterTasksSchemas = z.infer<ReturnType<typeof createFilterTasksSchema>>;

export type { FilterTasksSchemas };
export { createFilterTasksSchema };
