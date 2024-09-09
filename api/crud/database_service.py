## Script to fill the database from the data JSON files generated in data_generation folder

from os import environ
import psycopg2

from api.core.config import settings

class DatabaseService:

    def __init__(self):
        self.db_connection = self.__init_db_connection() # .connection

    # def execute_query(self, query, args):
    #     with self.connection:
    #         with connection.cursor() as cur:
    #             # execute the statement
    #             try:
    #                 print(query)
    #                 cur.execute(query, args)

    #                 # commit the changes to the database
    #                 breakpoint()
    #                 conn.commit()

    #             except (Exception, psycopg2.DatabaseError) as error:
    #                 print(error)

    def cursor(self):
        self.db_connection.cursor()

    # Private method for initiating a connection to the database
    def __init_db_connection(self):
        try:
            return psycopg2.connect(settings.DB_URI())
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    def format_records(self, records):
        return list(map(lambda row: row._asdict(), records))
