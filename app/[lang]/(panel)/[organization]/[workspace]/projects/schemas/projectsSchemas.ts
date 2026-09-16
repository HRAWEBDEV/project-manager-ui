import { z } from "zod";

function updateProjectSchema() {
  return z.object({
    name: z.string().min(1),
    description: z.string(),
    color: z.string(),
  });
}

type UpdateProjectSchema = z.infer<ReturnType<typeof updateProjectSchema>>;

export type { UpdateProjectSchema };
export { updateProjectSchema };
