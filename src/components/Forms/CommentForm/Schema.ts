import z from "zod/v3";

export const CommonFormSchema = z.object({
  comment: z.string().min(1, { message: "comment cannot be empty" }),
});
