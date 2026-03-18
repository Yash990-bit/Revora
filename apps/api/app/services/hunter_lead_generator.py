import requests
import os

HUNTER_API_KEY = os.getenv("HUNTER_API_KEY")

def get_leads_from_domain(domain):

    url = "https://api.hunter.io/v2/domain-search"

    params = {
        "domain": domain,
        "api_key": HUNTER_API_KEY
    }

    response = requests.get(url, params=params)
    
    if response.status_code != 200:
        print(f"Hunter API Error {response.status_code}: {response.text}")
        return []

    data = response.json()

    leads = []

    for person in data.get("data", {}).get("emails", []):
        leads.append({
            "first_name": person.get("first_name", ""),
            "last_name": person.get("last_name", ""),
            "email": person.get("value", ""),
            "company": domain, # Add domain as company for Hunter leads
            "job_title": person.get("position", ""),
            "linkedin": ""
        })

    return leads

def generate_leads_from_hunter(icp, limit=50):
    # Since Hunter requires a domain, but ICP filter doesn't provide one,
    # we use a sample domain for the sake of demonstration and testing.
    # In a real-world scenario, you might derive domain from an external API using the ICP criteria.
    domain = "stripe.com"
    leads = get_leads_from_domain(domain)
    return leads[:limit]