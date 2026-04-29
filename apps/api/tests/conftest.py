"""Pytest configuration and fixtures."""

import os
import sys
from pathlib import Path

# Add the app directory to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Set test environment variables before any app imports
os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["SECRET_KEY"] = "test-secret-key-for-unit-tests-only"
os.environ["ALGORITHM"] = "HS256"
os.environ["ACCESS_TOKEN_EXPIRE_MINUTES"] = "30"
os.environ["GROQ_API_KEY"] = "gsk_test_key_for_unit_testing"

import pytest
from fastapi.testclient import TestClient


@pytest.fixture
def test_client():
    """Create a test client for the FastAPI application."""
    # Import here to avoid circular imports
    from app.main import app

    return TestClient(app)


@pytest.fixture
def mock_db_session():
    """Mock database session for testing."""
    from unittest.mock import MagicMock

    return MagicMock()
