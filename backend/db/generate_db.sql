-- DROP DATABASE IF EXISTS fretbored WITH (FORCE);

CREATE DATABASE fretbored;

CREATE TABLE triads (
    id INTEGER PRIMARY KEY,
    chord_type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    notes VARCHAR[] NOT NULL,
    note_locations VARCHAR[] NOT NULL,
    strings INT[] NOT NULL
);