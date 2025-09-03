import z from "zod/v3";

export const moveVideoSchema = z.object({
  folder_id: z.string().optional(),
  workSpaceId: z.string(),
});
