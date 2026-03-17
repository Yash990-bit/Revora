import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

class Campaign(Base):
    __tablename__="campaign"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    campaign_name = Column(String)
    product_name = Column(String)
    product_description = Column(String)
    goal = Column(String)