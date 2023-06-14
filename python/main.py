from openai_client import openai_client

result = openai_client.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "Hello, ChatGPT!"}
    ]
)

print(result.choices[0].message)  # type: ignore
