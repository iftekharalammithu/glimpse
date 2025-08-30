import z from "zod/v3";

export const workspaceSchema = z.object({
  name: z.string().min(1, { message: "Workspace name can not be empty" }),
});
