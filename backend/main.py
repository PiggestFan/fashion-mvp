from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import httpx, os

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

API4AI_KEY = os.getenv("API4AI_KEY")

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    files = {"image": (file.filename, file.file, file.content_type)}
    headers = {"apikey": API4AI_KEY}
    async with httpx.AsyncClient() as client:
        r = await client.post("https://fashion-api.api4ai.cloud/api/v1/results", headers=headers, files=files)
    data = r.json()["results"][0]["entities"][0]["objects"]
    items = [{"label": obj["entities"][0]["class"], "bbox": obj["box"]} for obj in data]
    return {"items": items}
