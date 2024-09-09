from sqlalchemy import text

from api.core.db import database_connection


class TriadsDatabaseService:

    def __init__(self):
        super().__init__

    def get_triads(self, strings, number_of_questions):
        query = text(f"SELECT * FROM triads WHERE strings = ARRAY[%s] LIMIT %s")

        results = self.execute_query(query, (strings, number_of_questions))

    def insert_triad(self, name, chord_type, notes, strings, note_locations):

        query = text(
            f"INSERT INTO triads (name, chord_type, notes, strings, note_locations) VALUES (%s, %s, %s, %s)"
        )

        results = self.execute_query(
            query, (name, chord_type, notes, strings, note_locations)
        )
