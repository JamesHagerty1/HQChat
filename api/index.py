import uvicorn
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def get_root():
    return { "message": "Hello, FastAPI!" }


if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=8000, reload=True)
