"""Database models."""

from sqlalchemy import ARRAY, Column, Integer, String

from . import db


class Triad(db.Model):
    __tablename__ = "triads"
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    chord_type = Column(String(20))
    notes = Column(ARRAY(String, dimensions=3))
    strings = Column(ARRAY(Integer, dimensions=3))
    note_locations = Column(ARRAY(String, dimensions=3))

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return f"{self.name!r}>"
