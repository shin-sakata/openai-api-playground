import { add } from "./add.mjs"
import { openAIApi } from "./openai.mjs"

const result = await openAIApi.createChatCompletion({
  model: "gpt-3.5-turbo-0613",
  messages: [{ role: "user", content: "63434563 と 456345464535 を足した結果を教えてください。" }],
  functions: [add.definition],
})

console.log(result.data.choices.at(0)?.message)

const functionCall = result.data.choices.at(0)?.message?.function_call
const functionName = functionCall?.name
const functionArguments = functionCall?.arguments

if (functionName && functionArguments) {
  let functionResult = ""
  switch (functionName) {
    case add.name:
      functionResult = add.run(functionArguments)
      break
    default:
      throw Error(`関数が見つかりませんでした: ${functionName}`)
  }

  const result = await openAIApi.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: "user", content: "63434563 と 456345464535 を足した結果を教えてください。" },
      { role: "function", name: "add", content: functionResult },
    ],
  })

  console.log(result.data.choices.at(0)?.message)
} else {
  console.log(result.data.choices.at(0)?.message)
}
