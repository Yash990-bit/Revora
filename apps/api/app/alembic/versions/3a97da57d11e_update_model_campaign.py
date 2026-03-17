"""Update Model Campaign

Revision ID: 3a97da57d11e
Revises: 1f94751d3698
Create Date: 2026-03-17 20:50:43.190373

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3a97da57d11e'
down_revision: Union[str, Sequence[str], None] = '1f94751d3698'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
