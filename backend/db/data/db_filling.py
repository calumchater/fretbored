## Script to fill the database from the data JSON files generated in data_generation folder

from os import environ, path
import json
import psycopg2
from dotenv import load_dotenv

BASE_DIR = path.abspath(path.dirname(__file__))
load_dotenv(path.join(BASE_DIR, "../.env"))

TRIADS_FILE = "./generated_data/triads.json"


def init_db_connection():
    try:
        return psycopg2.connect(environ.get("SQLALCHEMY_DATABASE_URI"))
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)


def build_triad_sql_insert(triad):
    sql = f"INSERT INTO triads (name, notes, chord_type, strings, note_locations) VALUES ('{triad['name']}', ARRAY{triad['notes']}, '{triad['chord_type']}', ARRAY{triad['strings']}, ARRAY{triad['note_locations']});"
    return sql


def insert_triad(connection, triad):
    with connection as conn:
        with conn.cursor() as cur:
            # execute the INSERT statement
            sql = build_triad_sql_insert(triad)

            try:
                print(sql)
                cur.execute(sql)

                # commit the changes to the database
                conn.commit()

            except (Exception, psycopg2.DatabaseError) as error:
                print(error)


def import_triads():
    connection = init_db_connection()

    with open(TRIADS_FILE, "r") as f:
        data = json.load(f)
        for triad in data:
            insert_triad(connection, triad)

import_triads()