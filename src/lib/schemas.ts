import { z } from "zod";

export const requestSchema = z.object({
  endpoint: z.string().url(),
  token_path: z.string(),
  fields: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
});
