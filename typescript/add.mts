import { z } from "zod"
import { makeOpenAIFunction } from "./functions.mjs"

export const add = makeOpenAIFunction({
  name: "add",
  description: "二つの数字を足し算することができる",
  paramsSchema: z.object({
    a: z.number(),
    b: z.number(),
  }),
  implementation: ({ a, b }) => a + b,
})
