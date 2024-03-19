
# Create our database and the tables
psql postgresql://postgres:postgres@localhost:5432/fretbored -a -f generate_db.sql

# Import our triads
python3 data/db_filling.py