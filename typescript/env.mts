import { z } from "zod"

const Env = z.object({
  OPENAI_API_KEY: z.string().nonempty(),
  OPENAI_ORG_ID: z.string().nonempty(),
})

export type Env = z.infer<typeof Env>
export const env: Env = Env.parse(process.env)
