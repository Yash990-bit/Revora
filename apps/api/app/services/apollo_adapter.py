class ApolloAdapter:
    """
    DESIGN PATTERN: Adapter Pattern
    
    SOLID PRINCIPLES:
    """
    
    @staticmethod
    def normalize_lead_data(person_data: dict) -> dict:
        """
        Adapts an external Apollo person dictionary to our internal Lead schema.
        """
        # Encapsulating the complex/nested extractions here
        company_name = person_data.get("organization", {}).get("name", "")
        
        return {
            "first_name": person_data.get("first_name", ""),
            "last_name": person_data.get("last_name", ""),
            "email": person_data.get("email", ""),
            "company": company_name,
            "job_title": person_data.get("title", ""),
            "linkedin": person_data.get("linkedin_url", "")
        }
