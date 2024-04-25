"""Initialize Flask app."""

from os import environ, path
from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

BASE_DIR = path.abspath(path.dirname(__file__))
load_dotenv(path.join(BASE_DIR, "../.env"))


db = SQLAlchemy()  # create_engine(environ.get("SQLALCHEMY_DATABASE_URI"))


def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object("config.Config")

    CORS(app, origins=environ.get("FRONTEND_URL"), supports_credentials=True)

    # Initialize Database Plugin
    db.init_app(app)
    with app.app_context():
        from . import routes  # Import routes

        db.create_all()  # Create database tables for our data models

        return app
