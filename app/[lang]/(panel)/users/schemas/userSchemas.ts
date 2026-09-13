import { z } from "zod";

function createUpdateUserSchema() {
  return z.object({
    username: z.string().min(3),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email().min(1),
    phoneNumber: z.email(),
  });
}

type UpdateUserSchema = z.infer<typeof createUpdateUserSchema>;

export type { UpdateUserSchema };
export { createUpdateUserSchema };
