import { OpenAIApi, Configuration } from "openai"
import { env } from "./env.mjs"

export const openAIApi = new OpenAIApi(
  new Configuration({
    apiKey: env.OPENAI_API_KEY,
    organization: env.OPENAI_ORG_ID,
  })
)
