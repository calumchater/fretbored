from typing import List
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from api.crud.triads_database_service import TriadsDatabaseService
from api.worker import generate_chords_job

router = APIRouter()


class SongModel(BaseModel):
    song_url: str


@router.post("/chords")
def chords(body: SongModel):

    song_url = body.song_url
    # verify object here
    job = generate_chords_job.delay(song_url)

    return JSONResponse({"job_id": job.id})
