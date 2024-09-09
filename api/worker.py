import os

from celery import Celery

from api.lib.chord_analyser_api import ChordAnalyserAPI
from api.services.generate_scales_service import GenerateScalesService

celery = Celery(__name__)
celery.conf.broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379")
celery.conf.result_backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379")

@celery.task(name="generate_scales_job")
def generate_scales_job(gaps, scale_type):
    GenerateScalesService.new(gaps, scale_type).call

@celery.task(name="generate_chords_job")
def generate_chords_job(song_url: str):
    ChordAnalyserAPI.generate_chords(song_url)