from typing import List
from fastapi import Depends
from sqlalchemy import text
from sqlmodel import Session

from api.core.db import engine

# def get_session():
#     with Session(engine) as session:
#         yield session

from api.core.db import database_connection


class ScalesDatabaseService:

    def __init__(self):
        super().__init__
        self.db = ""

    # Returns one scale of format
    def get_scale(self, scale_name):

        query = text(f"SELECT * FROM scales WHERE scale_name = %s")

        results = database_connection.cursor().execute(query)

    def get_scales(self, scale_type, notes):

        query = text(
            f"SELECT * FROM scales WHERE scale_type = %s AND starting_note IN (%s)"
        )

        results = database_connection.execute(query, (scale_type, notes))

    def insert_scale(
        self, starting_note: str, notes: List[str], name: str, scale_type: str
    ):

        query = text(
            f"INSERT INTO scales (starting_note, notes, scale_type, name) VALUES (%s, %s, %s, %s)"
        )

        results = database_connection.execute(
            query, (starting_note, notes, name, scale_type)
        )
