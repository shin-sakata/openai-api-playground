import { z } from "zod"
import type { ZodTypeAny } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"

export type OpenAiFunctionOptions<ZodParamsSchema extends ZodTypeAny, Returns, Name> = {
  name: Name
  description: string
  paramsSchema: ZodParamsSchema
  implementation: (args: z.infer<ZodParamsSchema>) => Returns
}

export type OpenAiFunction<ParamsSchema extends ZodTypeAny, Returns, Name> = {
  name: Name
  definition: {
    name: string
    description: string
    parameters: ReturnType<typeof zodToJsonSchema>
  }
  paramsSchema: ParamsSchema
  run: (stringParams: string) => string
} & OpenAiFunctionOptions<ParamsSchema, Returns, Name>

export function makeOpenAIFunction<ParamsSchema extends ZodTypeAny, Returns, Name extends string>(
  options: OpenAiFunctionOptions<ParamsSchema, Returns, Name>
): OpenAiFunction<ParamsSchema, Returns, Name> {
  return {
    definition: {
      name: options.name,
      description: options.description,
      parameters: zodToJsonSchema(options.paramsSchema),
    },
    run: (stringParams: string) => {
      return JSON.stringify(options.implementation(options.paramsSchema.parse(JSON.parse(stringParams))))
    },
    ...options,
  }
}
