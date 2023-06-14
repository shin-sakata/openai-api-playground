from pydantic import BaseModel
from os import environ


class Env(BaseModel):
    OPENAI_API_KEY: str
    OPENAI_ORG_ID: str

    @classmethod
    def from_environ(cls, environ):
        return cls(**{
            key: environ[key]
            for key in cls.__fields__
            if key in environ
        })


env: Env = Env.from_environ(environ)
