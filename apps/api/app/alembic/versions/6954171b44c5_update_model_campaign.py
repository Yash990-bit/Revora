"""Update Model Campaign

Revision ID: 6954171b44c5
Revises: 3a97da57d11e
Create Date: 2026-03-17 20:52:31.071494

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6954171b44c5'
down_revision: Union[str, Sequence[str], None] = '3a97da57d11e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
