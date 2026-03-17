from pydantic import BaseModel

class CampaignCreate(BaseModel):
    campaign_name: str
    product_name: str
    product_description: str
    goal: str
    lead_sources: List[str]
    lead_limit: int

class CampaignResponse(BaseModel):
    id: str
    campaign_name: str
    product_name: str
    goal: str
    lead_sources: List[str]
    lead_limit: int

    class Config:
        orm_mode = True