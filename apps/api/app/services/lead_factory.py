from typing import Optional
from app.services.lead_generation_strategy import (
    LeadGenerationStrategy,
    ApolloLeadStrategy,
    LinkedInLeadStrategy,
    HunterLeadStrategy
)

class LeadGeneratorFactory:
    """
    DESIGN PATTERN: Factory Pattern
    """
    
    @staticmethod
    def get_strategy(source_name: str) -> Optional[LeadGenerationStrategy]:
        source_name = source_name.lower().strip()
        
        if source_name == "apollo":
            return ApolloLeadStrategy()
        elif source_name == "linkedin":
            return LinkedInLeadStrategy()
        elif source_name == "hunter":
            return HunterLeadStrategy()
        else:
            print(f"Warning: No valid LeadGenerationStrategy found for '{source_name}'")
            return None
