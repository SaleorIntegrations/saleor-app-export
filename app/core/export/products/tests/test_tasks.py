import os
from unittest import mock

import pytest
from sqlmodel import select

from app.core.export.products.tasks import ProductExportMethods
from app.core.export.tasks import continue_export, init_export_for_report
from app.core.reports.models import ExportFile


@pytest.mark.asyncio
@mock.patch("app.core.export.tasks.continue_export")
@mock.patch.object(ProductExportMethods, "get_headers")
async def test_init_export_for_report(
    m_headers, m_continue, db_session, products_report
):
    # given
    m_headers.return_value = ["a", "b", "c"]

    # when
    await init_export_for_report.inner(db_session, products_report.id)

    # then
    export = (
        await db_session.exec(
            select(ExportFile).where(ExportFile.report_id == products_report.id)
        )
    ).one()
    assert export.cursor == ""
    assert export.content_file.startswith(f"media/{products_report.id}-")
    assert os.path.isfile(export.content_file)
    with open(export.content_file) as f:
        assert len(f.readlines()) == 1
    m_continue.delay.assert_called_once_with(export.id)


@pytest.mark.asyncio
@mock.patch.object(ProductExportMethods, "fetch_response")
@mock.patch("app.core.export.tasks._continue_export")
async def test_continue_export_with_empty_cursor(
    m_continue,
    m_fetch_response,
    dummy_variants_response_has_no_next,
    db_session,
    products_export,
):
    # given
    m_fetch_response.return_value = dummy_variants_response_has_no_next

    # when
    await continue_export.inner(db_session, products_export.id)

    # then
    assert m_continue.call_count == 0


@pytest.mark.asyncio
@mock.patch.object(ProductExportMethods, "fetch_response")
@mock.patch("app.core.export.tasks._continue_export")
async def test_continue_export_with_next_page(
    m_continue,
    m_fetch_response,
    dummy_variants_response_has_next,
    db_session,
    products_export,
):
    # given
    m_fetch_response.return_value = dummy_variants_response_has_next

    # when
    await continue_export.inner(db_session, products_export.id)

    # then
    refreshed_export = (
        await db_session.exec(
            select(ExportFile).where(ExportFile.id == products_export.id)
        )
    ).one()
    assert m_continue.call_count == 1
    assert refreshed_export.cursor != ""
