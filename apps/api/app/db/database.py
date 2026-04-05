# Connecting Database
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

class DatabaseManager:
    """
    DESIGN PATTERN: Singleton
    
    OOP CONCEPT: Encapsulation
    """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            print("Creating new DatabaseManager instance")
            cls._instance = super(DatabaseManager, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        self.DATABASE_URL = os.getenv("DATABASE_URL")
        self.engine = create_engine(
            self.DATABASE_URL,
            pool_pre_ping=True,
            pool_recycle=300,
            connect_args={"keepalives": 1, "keepalives_idle": 30, "keepalives_interval": 10, "keepalives_count": 5}
        )
        self.SessionLocal = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=self.engine
        )

# Create a singleton instance
db_manager = DatabaseManager()

# Expose standard variables for backwards compatibility, or route consumers can use db_manager directly
engine = db_manager.engine
SessionLocal = db_manager.SessionLocal