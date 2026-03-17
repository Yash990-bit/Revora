from pydantic import BaseModel

class CampaignCreate(BaseModel):
    campaign_name: str
    product_name: str
    product_description: str
    goal: str

class CampaignResponse(BaseModel):
    id: str
    campaign_name: str
    product_name: str
    goal: str

    class Config:
        orm_mode = True