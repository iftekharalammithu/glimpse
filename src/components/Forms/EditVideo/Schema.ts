import z from "zod/v3";

export const editVideoInfoschema = z.object({
  title: z
    .string()
    .min(5, { message: "Video title must have atlest 5 character" }),
  description: z
    .string()
    .min(100, { message: "Video decription must have atlest 100 character" }),
});
