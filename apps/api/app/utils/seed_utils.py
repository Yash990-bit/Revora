from sqlalchemy.orm import Session
from app.models.campaign import Campaign
from app.models.leads import Leads
from app.models.icp_filter import ICP

ALLOWED_EMAILS = [
    "satyamkumarch15@gmail.com",
    "test@gmail.com",
    "yash.raghubanshi2024@nst.rishihood.edu.in",
]


def seed_welcome_data(db: Session, user_id: str, email: str):
    """
    Seeds a welcome campaign and dummy leads ONLY for whitelisted users.
    """
    if email not in ALLOWED_EMAILS:
        return False

    try:
        # 1. Create Welcome Campaign
        campaign = Campaign(
            campaign_name="Personalized Test Campaign",
            product_name="Revora AI",
            product_description="An autonomous outreach platform that scales beyond human limits.",
            goal="Book discovery calls for AI agents.",
            lead_sources=["Manual"],
            lead_limit=10,
            status="active",
            user_id=user_id,
        )
        db.add(campaign)
        db.commit()
        db.refresh(campaign)

        # 2. Create ICP (needed for generation)
        icp = ICP(
            campaign_id=campaign.id,
            industry="Software & AI",
            job_titles="Founder, CEO, Growth Head",
        )
        db.add(icp)

        # 3. Create Leads as requested
        lead1 = Leads(
            campaign_id=campaign.id,
            first_name="Satyam",
            last_name="Kumar",
            email="kumarsatyamking@gmail.com",
            company="Revora Autonomous",
            job_title="Founder",
            linkedin="https://linkedin.com/in/satyam",
        )
        lead2 = Leads(
            campaign_id=campaign.id,
            first_name="Saty",
            last_name="Kumar",
            email="satyam.kumar2024@nst.rishihood.edu.in",
            company="Rishihood University",
            job_title="Lead Developer",
            linkedin="https://linkedin.com/in/saty",
        )
        db.add(lead1)
        db.add(lead2)

        db.commit()
        return True
    except Exception as e:
        print(f"Failed to seed welcome data for user {user_id}: {e}")
        db.rollback()
        return False
