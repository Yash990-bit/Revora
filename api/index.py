import sys
import os

# Add the apps/api directory to the Python path
# This allows us to import the 'app' module correctly
backend_path = os.path.join(os.path.dirname(__file__), "..", "apps", "api")
sys.path.append(backend_path)

try:
    from app.main import app
except ImportError as e:
    print(f"Error importing app: {e}")
    # Fallback/Debug info for Vercel logs
    print(f"Current Path: {sys.path}")
    print(f"Directory Contents: {os.listdir(backend_path)}")
    raise
