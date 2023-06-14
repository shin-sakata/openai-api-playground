from env import env
import openai as openai_client

openai_client.api_key = env.OPENAI_API_KEY
openai_client.organization = env.OPENAI_ORG_ID
