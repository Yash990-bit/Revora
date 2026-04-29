from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel as PydanticBase

from app.db.database import SessionLocal
from app.models.campaign import Campaign
from app.models.icp_filter import ICP
from app.models.leads import Leads
from app.schemas.campaign_schema import CampaignCreate, CampaignStatusUpdate
from app.services.email_generator import EmailGenerator
from app.core.dependencies import get_current_user
from app.models.user import User

# Initialize modern singleton service
email_gen = EmailGenerator()

router = APIRouter(prefix="/campaign", tags=["Campaign"])

DEMO_PRODUCT_NAME = "LevelUp"
DEMO_PRODUCT_DESCRIPTION = "An operating system for operations and HR management that helps teams streamline workflows, people operations, task ownership, and day-to-day execution in one place."
DEMO_GOAL = "Introduce LevelUp and book a discovery call with each lead"


def campaign_sender_name(campaign: Campaign, current_user: User) -> str:
    company_name = (campaign.product_name or current_user.company_name or "").strip()
    return f"{company_name} Team" if company_name else "Revora Team"


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create")
def create_campaign(
    data: CampaignCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Creates a new outreach campaign with initial settings restricted to current user."""
    campaign = Campaign(
        campaign_name=data.campaign_name,
        product_name=data.product_name,
        product_description=data.product_description,
        goal=data.goal,
        lead_sources=data.lead_sources,
        lead_limit=data.lead_limit,
        status="active",
        user_id=str(current_user.id),
    )
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return {"message": "Campaign created", "id": campaign.id, "campaign_id": campaign.id}


@router.post("/demo-personalized-email")
def create_demo_personalized_email_campaign(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Creates a small owned demo campaign with two leads for testing personalized sending."""
    campaign = (
        db.query(Campaign)
        .filter(
            Campaign.campaign_name == "Demo Personalized Outreach",
            Campaign.user_id == str(current_user.id),
        )
        .first()
    )

    if not campaign:
        campaign = Campaign(
            campaign_name="Demo Personalized Outreach",
            product_name=DEMO_PRODUCT_NAME,
            product_description=DEMO_PRODUCT_DESCRIPTION,
            goal=DEMO_GOAL,
            lead_sources=["Demo"],
            lead_limit=2,
            status="active",
            user_id=str(current_user.id),
        )
        db.add(campaign)
        db.commit()
        db.refresh(campaign)
    else:
        campaign.product_name = DEMO_PRODUCT_NAME
        campaign.product_description = DEMO_PRODUCT_DESCRIPTION
        campaign.goal = DEMO_GOAL
        campaign.lead_sources = ["Demo"]
        campaign.lead_limit = 2
        campaign.status = "active"

    icp = db.query(ICP).filter(ICP.campaign_id == campaign.id).first()
    if not icp:
        db.add(
            ICP(
                campaign_id=campaign.id,
                industry="B2B SaaS and education technology",
                location="India",
                company_size="1-50",
                job_titles="Founder, Student Builder",
            )
        )

    demo_leads = [
        {
            "first_name": "Satyam",
            "last_name": "",
            "email": "kumarsatyamking@gmail.com",
            "company": "Revora Demo",
            "job_title": "Founder",
            "linkedin": "",
        },
        {
            "first_name": "Saty",
            "last_name": "",
            "email": "satyam.kumar2024@nst.rishihood.edu.in",
            "company": "Rishihood University",
            "job_title": "Student Builder",
            "linkedin": "",
        },
    ]

    for lead_data in demo_leads:
        lead = (
            db.query(Leads)
            .filter(
                Leads.campaign_id == campaign.id,
                Leads.email == lead_data["email"],
            )
            .first()
        )
        if lead:
            for key, value in lead_data.items():
                setattr(lead, key, value)
        else:
            db.add(Leads(campaign_id=campaign.id, **lead_data))

    db.commit()
    return {
        "message": "Demo campaign ready",
        "campaign_id": campaign.id,
        "campaign": {
            "id": campaign.id,
            "campaign_name": campaign.campaign_name,
            "product_name": campaign.product_name,
            "product_description": campaign.product_description,
            "goal": campaign.goal,
            "lead_sources": campaign.lead_sources,
            "lead_limit": campaign.lead_limit,
            "status": campaign.status or "active",
            "has_icp": True,
            "lead_count": len(demo_leads),
        },
        "lead_count": len(demo_leads),
    }


@router.patch("/{campaign_id}/status")
def update_campaign_status(
    campaign_id: str,
    data: CampaignStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Updates the operational status of an existing campaign securely."""
    campaign = (
        db.query(Campaign)
        .filter(Campaign.id == campaign_id, Campaign.user_id == str(current_user.id))
        .first()
    )
    if not campaign:
        return {"error": "Campaign not found"}
    campaign.status = data.status
    db.commit()
    return {"message": "Status updated", "status": campaign.status}


@router.get("/")
def get_campaigns(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Retrieves all connected campaigns securely mapped to the requesting agent via JWT."""
    campaigns = db.query(Campaign).filter(Campaign.user_id == str(current_user.id)).all()
    icp_ids = {icp.campaign_id for icp in db.query(ICP.campaign_id).all()}
    lead_counts = {
        campaign_id: count
        for campaign_id, count in db.query(Leads.campaign_id, func.count(Leads.id))
        .group_by(Leads.campaign_id)
        .all()
    }
    return [
        {
            "id": c.id,
            "campaign_name": c.campaign_name,
            "product_name": c.product_name,
            "product_description": c.product_description,
            "goal": c.goal,
            "lead_sources": c.lead_sources,
            "lead_limit": c.lead_limit,
            "status": c.status or "active",
            "has_icp": c.id in icp_ids,
            "lead_count": lead_counts.get(c.id, 0),
        }
        for c in campaigns
    ]


# ── Email Generation Contract ──


class EmailGenerateRequest(PydanticBase):
    goal: str = ""
    tone: str = "Professional"
    value_props: str = ""
    subject_format: str = ""
    improve: bool = False
    iteration: int = 1
    previous_subject: str = ""
    previous_body: str = ""
    sender_name: str = ""


@router.post("/{campaign_id}/generate-email")
def generate_email(
    campaign_id: str,
    data: EmailGenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Triggers the agentic generation flow for a campaign's personalized email."""
    campaign = (
        db.query(Campaign)
        .filter(Campaign.id == campaign_id, Campaign.user_id == str(current_user.id))
        .first()
    )
    if not campaign:
        return {"error": "Campaign not found"}

    icp = db.query(ICP).filter(ICP.campaign_id == campaign_id).first()
    lead = db.query(Leads).filter(Leads.campaign_id == campaign_id).first()

    # Structure metadata for optimized LLM context
    campaign_info = {
        "product_name": campaign.product_name,
        "product_description": campaign.product_description,
        "goal": campaign.goal,
    }
    icp_info = {"industry": icp.industry, "job_titles": icp.job_titles} if icp else None
    lead_info = (
        {"first_name": lead.first_name, "company": lead.company, "job_title": lead.job_title}
        if lead
        else None
    )

    sender_name = data.sender_name.strip() or campaign_sender_name(campaign, current_user)

    return email_gen.generate_personalized_email(
        campaign_info=campaign_info,
        icp_info=icp_info,
        lead_info=lead_info,
        tone=data.tone,
        goal=data.goal,
        value_props=data.value_props,
        subject_format=data.subject_format,
        improve=data.improve,
        iteration=data.iteration,
        previous_subject=data.previous_subject,
        previous_body=data.previous_body,
        sender_name=sender_name,
    )
