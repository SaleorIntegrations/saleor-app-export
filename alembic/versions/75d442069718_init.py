"""Init

Revision ID: 75d442069718
Revises:
Create Date: 2022-01-07 00:23:18.421960

"""
import sqlalchemy as sa
import sqlmodel.sql.sqltypes

from alembic import op

# revision identifiers, used by Alembic.
revision = "75d442069718"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "report",
        sa.Column("filter_input", sa.JSON(), nullable=True),
        sa.Column("columns", sa.JSON(), nullable=True),
        sa.Column("id", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("name", sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column("scope", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("type", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("format", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "job",
        sa.Column("id", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("status", sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column("content_file", sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column("cursor", sqlmodel.sql.sqltypes.AutoString(), nullable=True),
        sa.Column("report_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["report_id"],
            ["report.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "exportevent",
        sa.Column("parameters", sa.JSON(), nullable=True),
        sa.Column("id", sa.Integer(), nullable=True),
        sa.Column("date", sa.DateTime(), nullable=True),
        sa.Column("type", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("export_file_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["export_file_id"],
            ["job.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("exportevent")
    op.drop_table("job")
    op.drop_table("report")
    # ### end Alembic commands ###