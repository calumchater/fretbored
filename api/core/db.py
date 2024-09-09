from sqlmodel import SQLModel, Session, create_engine, select

from api.core.config import settings
from api.crud.database_service import DatabaseService
from api.models import Triad, Scale, Gap

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


# make sure all SQLModel models are imported (app.models) before initializing DB
# otherwise, SQLModel might fail to initialize relationships properly
# for more details: https://github.com/fastapi/full-stack-fastapi-template/issues/28


def init_db(session: Session) -> None:

    SQLModel.metadata.create_all(engine)

init_db(Session(engine))
    
database_connection = DatabaseService()