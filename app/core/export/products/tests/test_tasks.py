import os

import pytest
from sqlmodel import select

from app.core.export.products.tasks import init_export_for_report
from app.core.reports.models import ExportFile


@pytest.mark.asyncio
async def test_init_export_for_report(db_session, report):
    # given
    # when
    await init_export_for_report(db_session, report.id)
    # then
    export = (
        await db_session.exec(
            select(ExportFile).where(ExportFile.report_id == report.id)
        )
    ).one()
    assert export.cursor == ""
    assert export.content_file.startswith(f"media/{report.id}-")
    assert os.path.isfile(export.content_file)

    with open(export.content_file) as f:
        assert len(f.readlines()) == 2
