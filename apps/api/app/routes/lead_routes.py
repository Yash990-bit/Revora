from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.campaign import Campaign
from app.models.icp_filter import ICP
from app.models.leads import Leads as Lead

from app.services.lead_factory import LeadGeneratorFactory

router = APIRouter(prefix="/campaign", tags=["Leads"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def process_leads_background(campaign_id: str, icp_id: str):
    db = SessionLocal()
    try:
        campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
        icp = db.query(ICP).filter(ICP.id == icp_id).first()

        if not campaign or not icp:
            return

        leads = []
        
        # If no sources specified, default to Apollo
        sources = campaign.lead_sources if campaign.lead_sources else ["Apollo"]
        
        for source in sources:
            # Factory Pattern in action!
            strategy = LeadGeneratorFactory.get_strategy(source)
            if strategy:
                # Open/Closed & Dependency Inversion Principle
                # We call generate_leads on the interface without caring about the concrete class.
                generated = strategy.generate_leads(icp, campaign.lead_limit)
                leads.extend(generated)

        for lead in leads:
            new_lead = Lead(
                campaign_id=campaign_id,
                first_name=lead.get("first_name", ""),
                last_name=lead.get("last_name", ""),
                email=lead.get("email", ""),
                company=lead.get("company", ""),
                job_title=lead.get("job_title", ""),
                linkedin=lead.get("linkedin", "")
            )
            db.add(new_lead)
        
        db.commit()
    except Exception as e:
        print(f"Error generating leads: {e}")
        db.rollback()
    finally:
        db.close()


@router.post("/{campaign_id}/generate-leads")
def generate_leads(campaign_id: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):

    # Fetch campaign
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        return {"error": "Campaign not found"}

    # Fetch ICP
    icp = db.query(ICP).filter(ICP.campaign_id == campaign_id).first()

    if not icp:
        return {"error": "ICP not found"}

    background_tasks.add_task(process_leads_background, campaign_id, icp.id)

    return {
        "message": "Leads generation started in the background",
        "status": "processing"
    }


@router.get("/{campaign_id}")
def get_leads(campaign_id: str, db: Session = Depends(get_db)):
    leads = db.query(Lead).filter(Lead.campaign_id == campaign_id).all()
    return leads