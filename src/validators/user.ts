import z from "zod";

export const userPayloadValidator = z.object({
  name: z.string(),
  password: z.string(),
})