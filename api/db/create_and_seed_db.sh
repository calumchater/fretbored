
# Create our database and the tables
psql postgresql://postgres:postgres@localhost:5432/fretbored -a -f generate_db.sql
