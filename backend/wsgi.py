"""App entry point."""

from sqlalchemy import create_engine
from api import create_app

app = create_app()
connection = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])
