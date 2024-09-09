from fastapi import APIRouter

from api.routes import scales, triads, chords

api_router = APIRouter()

api_router.include_router(scales.router, tags=["scales"])
api_router.include_router(triads.router, tags=["triads"])
api_router.include_router(chords.router, tags=["chords"])


