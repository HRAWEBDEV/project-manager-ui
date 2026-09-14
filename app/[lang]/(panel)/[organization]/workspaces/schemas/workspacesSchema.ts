import { z } from "zod";

function createUpdateWorkspaceSchema() {
  return z.object({
    name: z.string().min(3),
    description: z.string(),
  });
}

type UpdateWorkspaceSchema = z.infer<
  ReturnType<typeof createUpdateWorkspaceSchema>
>;

export type { UpdateWorkspaceSchema };
export { createUpdateWorkspaceSchema };
