from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: List[Any]
    edges: List[Any]


def check_is_dag(nodes: List[Any], edges: List[Any]) -> bool:
    """
    Detect whether the graph is a Directed Acyclic Graph using
    iterative DFS with WHITE / GRAY / BLACK node colouring.
    """
    adj: dict[str, List[str]] = {n["id"]: [] for n in nodes}
    for e in edges:
        source = e.get("source")
        target = e.get("target")
        if source in adj:
            adj[source].append(target)

    WHITE, GRAY, BLACK = 0, 1, 2
    color: dict[str, int] = {n["id"]: WHITE for n in nodes}

    def dfs(start: str) -> bool:
        # Iterative DFS to avoid recursion limit issues
        stack = [(start, False)]
        while stack:
            node, backtrack = stack.pop()
            if backtrack:
                color[node] = BLACK
                continue
            if color.get(node) == GRAY:
                return False  # back-edge → cycle
            if color.get(node) == BLACK:
                continue
            color[node] = GRAY
            stack.append((node, True))  # schedule backtrack
            for neighbour in adj.get(node, []):
                if color.get(neighbour) == GRAY:
                    return False  # cycle detected
                if color.get(neighbour) == WHITE:
                    stack.append((neighbour, False))
        return True

    for node_id, c in list(color.items()):
        if c == WHITE:
            if not dfs(node_id):
                return False
    return True


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }
