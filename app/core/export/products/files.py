from typing import List


def write_partial_result_to_file(
    path: str,
    cols: List[str],
    delimiter: str = ";",
):
    with open(path, "a") as f:
        f.write(delimiter.join(cols))
