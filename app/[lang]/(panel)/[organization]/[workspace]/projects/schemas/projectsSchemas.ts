import { z } from "zod";

function updateProjectSchema() {
  return z.object({
    name: z.string().min(1),
    description: z.string(),
    color: z.string(),
  });
}

type UpdateProjectSchema = z.infer<ReturnType<typeof updateProjectSchema>>;

function filterProjectsSchemas() {
  return z.object({
    search: z.string(),
  });
}
type FilterProjectsSchemas = z.infer<ReturnType<typeof filterProjectsSchemas>>;

export type { UpdateProjectSchema, FilterProjectsSchemas };
export { updateProjectSchema, filterProjectsSchemas };
