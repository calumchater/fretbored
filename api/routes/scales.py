

import uuid
from typing import Any, List

from api.core.db import engine

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlmodel import Session, func, select

from api.crud.scales_database_service import ScalesDatabaseService

from api.models import Scale
from api.worker import generate_scales_job

router = APIRouter()

class ScaleModel(BaseModel):
    gaps: List[int]
    name: str
    scale_type: str
    notes: List[str]


# Returns one scale for the chord analyser 
@router.get("/scale", response_model=Scale)
def scales(name: str):
    with Session(engine) as session:
        scales = ScalesDatabaseService().get_scale(name)

    return JSONResponse(scales, success=True)


# We have the chords of a key
# That key is a group of notes
# We want the scales for each note, based on the type
@router.get("/scales")
def scales(scale_type: str,  notes: List[str]):

    scales = ScalesDatabaseService().get_scales(scale_type, notes)

    return JSONResponse(scales, success=True)

# Allows a user to post a new scale and identify all the notes
@router.post("/scale")
def scales(body: ScaleModel):
    # verify object here
    scale_gaps = body.gaps
    name = body.name    
    
    job = generate_scales_job.delay(scale_gaps, name)
 
    return JSONResponse({"job_id": job.id}, success=True)