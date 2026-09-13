import { z } from "zod";

function createOrganizationSchema() {
  return z.object({
    name: z.string().min(3),
    description: z.string(),
  });
}

type UpdateOrganizationSchema = z.infer<
  ReturnType<typeof createOrganizationSchema>
>;

export type { UpdateOrganizationSchema };
export { createOrganizationSchema };
