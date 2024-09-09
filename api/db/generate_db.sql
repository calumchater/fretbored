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


CREATE TABLE gaps (
    id INTEGER PRIMARY KEY,
    scale_type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    gaps VARCHAR[] NOT NULL,
    note_locations VARCHAR[] NOT NULL
);

CREATE TABLE scales (
    id INTEGER PRIMARY KEY,
    scale_type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    notes VARCHAR[] NOT NULL,
    note_locations VARCHAR[] NOT NULL
);

