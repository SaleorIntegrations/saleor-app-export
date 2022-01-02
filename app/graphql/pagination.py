import base64
import dataclasses
import json
from typing import Any, List, Optional

MAX_PAGE_SIZE = 100


@dataclasses.dataclass
class ConnectionContext:
    first: int
    edges: List[Any]
    after: Optional[str] = None

    def has_next(self):
        return len(self.edges) > self.first

    def end_cursor(self):
        size = len(self.edges)
        if size == 0:
            return None

        if size > self.first:
            id = self.edges[self.first - 1].id
        else:
            id = self.edges[-1].id

        return self.encode_cursor(id)

    @staticmethod
    def decode_cursor(cursor: str):
        raw_cursor = base64.urlsafe_b64decode(cursor).decode()
        return json.loads(raw_cursor)["id"]

    @staticmethod
    def encode_cursor(id: int):
        raw_cursor = json.dumps({"id": id}).encode()
        return base64.urlsafe_b64encode(raw_cursor).decode()


@dataclasses.dataclass
class PageInfo:
    has_next: bool
    end_cursor: Optional[str] = None


@dataclasses.dataclass
class Edge:
    node: Any
