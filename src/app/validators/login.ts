import z from "zod";

export const loginPayloadValidator = z.object({
  name: z.string(),
  password: z.string(),
})