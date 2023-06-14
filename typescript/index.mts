import { openAIApi } from "./openai.mjs"

const result = await openAIApi.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello, ChatGPT!" }],
})

console.log(result.data.choices.at(0)?.message)
