import os
import requests
from abc import ABC, abstractmethod
from typing import List, Dict

from app.services.apollo_adapter import ApolloAdapter

class LeadGenerationStrategy(ABC):
    """
    DESIGN PATTERN: Strategy Pattern
    
    OOP CONCEPTS: Abstraction, Polymorphism
    """
    
    @abstractmethod
    def generate_leads(self, icp, limit: int = 50) -> List[Dict]:
        pass


class ApolloLeadStrategy(LeadGenerationStrategy):
    """
    Concrete Strategy for generating leads using the Apollo API.
    """
    def __init__(self):
        self.api_key = os.getenv("APOLLO_API_KEY")
        self.url = "https://api.apollo.io/v1/mixed_people/search"
        self.adapter = ApolloAdapter()

    def generate_leads(self, icp, limit: int = 50) -> List[Dict]:
        if not self.api_key:
            print("Warning: APOLLO_API_KEY is not set.")
            return []

        payload = {
            "api_key": self.api_key,
            "q_organization_industries": [icp.industry] if hasattr(icp, 'industry') and icp.industry else [],
            "person_titles": [icp.job_titles] if hasattr(icp, 'job_titles') and icp.job_titles else [],
            "q_organization_locations": [icp.location] if hasattr(icp, 'location') and icp.location else [],
            "page": 1,
            "per_page": limit
        }

        try:
            response = requests.post(self.url, json=payload)
            if response.status_code != 200:
                print(f"Apollo API Error {response.status_code}: {response.text}")
                return []
            
            data = response.json()
        except Exception as e:
            print(f"Error calling Apollo API: {e}")
            return []

        leads = []
        for person in data.get("people", []):
            # Using the Adapter to normalize the data
            normalized_lead = self.adapter.normalize_lead_data(person)
            leads.append(normalized_lead)

        return leads


class LinkedInLeadStrategy(LeadGenerationStrategy):
    """
    Another Concrete Strategy example for generating leads.
    """
    def generate_leads(self, icp, limit: int = 50) -> List[Dict]:
        # Dummy implementation returning fake data to demonstrate polymorphic behavior!
        print(f"Executing LinkedIn strategy for {limit} leads...")
        return [
            {
                "first_name": "John",
                "last_name": "LinkedInDoe",
                "email": "john.doe@linkedin-fake.com",
                "company": "LinkedIn Test Org",
                "job_title": "CTO",
                "linkedin": "https://linkedin.com/in/johndoe"
            }
        ]

class HunterLeadStrategy(LeadGenerationStrategy):
    """
    Another Concrete Strategy example for generating leads (Hunter).
    """
    def generate_leads(self, icp, limit: int = 50) -> List[Dict]:
        # Dummy implementation
        print(f"Executing Hunter strategy for {limit} leads...")
        return [
             {
                "first_name": "Jane",
                "last_name": "HunterSmith",
                "email": "jane@hunter.io",
                "company": "Hunter Test Org",
                "job_title": "CEO",
                "linkedin": "https://linkedin.com/in/janesmith"
            }
        ]
