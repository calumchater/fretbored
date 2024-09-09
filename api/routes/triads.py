
from typing import List
from fastapi import APIRouter
from fastapi.responses import JSONResponse

from api.crud.triads_database_service import TriadsDatabaseService

router = APIRouter()

@router.get("/triads")
def triads(strings: List[int], number_of_questions: int):
 
    triads = TriadsDatabaseService().get_triads(strings, number_of_questions)

    return JSONResponse(triads, success=True)