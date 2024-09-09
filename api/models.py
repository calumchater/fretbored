"""Database models."""
from sqlmodel import Field, SQLModel, ARRAY, Column, Integer
from typing import List


class Triad(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)    
    name: str
    chord_type: str
    notes: List[int] = Field(sa_column=Column(ARRAY(Integer)))
    strings: List[int] = Field(sa_column=Column(ARRAY(Integer)))
    note_locations: List[int] = Field(sa_column=Column(ARRAY(Integer)))


class Gap(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)    
    gaps: List[int] = Field(sa_column=Column(ARRAY(Integer)))


class Scale(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)    
    name: str
    starting_note: str
    notes: List[int] = Field(sa_column=Column(ARRAY(Integer)))

# Make this linked to scale too
# class ScalePosition(SQLModel, table=True):
#     id: int = Field(default=None, primary_key=True)    
#     name: str
#     scale_type: str
#     starting_note: str
#     note_locations: List[int] = Field(sa_column=Column(ARRAY(Integer)))


