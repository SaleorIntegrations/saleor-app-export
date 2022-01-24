from typing import List, Optional

from pydantic import BaseModel, Field


class RecipientInfo(BaseModel):
    users: Optional[List[str]] = Field(default_factory=list)
    permission_groups: Optional[List[str]] = Field(default_factory=list)
