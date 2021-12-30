from csv import writer
from typing import List


def write_partial_result_to_file(
    path: str, result: List[List[str]], delimiter: str = ";", reset: bool = False
):
    flags = "a"
    if reset:
        flags = "w"

    with open(path, flags) as f:
        w = writer(f, delimiter=delimiter)
        for row in result:
            w.writerow(row)
