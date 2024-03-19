"""Application routes."""

from dataclasses import asdict
from datetime import datetime

from flask import current_app as app
from flask import request, jsonify

from sqlalchemy import select, text

from .models import Triad
from . import db


@app.route("/triads", methods=["GET"])
def triads():
    # Request will always contain these parameters
    strings = request.args.get("strings")
    number_of_questions = request.args.get("number_of_questions")

    query = text(
        f"SELECT * FROM triads WHERE strings = ARRAY{strings} LIMIT {int(number_of_questions)}"
    )

    triads = db.session.execute(query)

    results = list(map(lambda row: row._asdict(), triads))

    return jsonify(results)
