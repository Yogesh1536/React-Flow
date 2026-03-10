This project is a Node-Based Pipeline/Graph Builder Application. It allows users to construct node-based graphs (pipelines) visually and verifies if the constructed graph is a Directed Acyclic Graph (DAG). It is split into two main components: a frontend built with React and a backend built with FastAPI.

1. Frontend (frontend directory)
--------------------------------

Tech Stack: React 18, bootstrapped with Create React App (CRA).
Key Libraries:
reactflow (v11): A powerful library for building node-based user interfaces and interactive diagrams. This is likely used as the core canvas where users can drag, drop, and connect nodes to form a pipeline.
zustand: A small, fast, and scalable bearbones state-management solution, used for managing the state of the nodes, edges, and application logic.
Purpose: Provides the visual interface for users to build their pipelines/graphs and sends the resulting nodes and edges structure to the backend for validation.


3. Backend (backend directory)
------------------------------

Tech Stack: Python with FastAPI framework.
Key Functionality: CORS Enabled: It is configured to allow cross-origin requests specifically from http://localhost:3000 (the standard React development server port).
Parsing Endpoint (POST /pipelines/parse): This is the core API constraint. It accepts a JSON payload representing the nodes and edges built on the frontend.
DAG Validation: It processes the edges to construct an adjacency list and runs an iterative Depth-First Search (DFS) algorithm to detect any cycles in the graph.
Response: It returns a JSON object containing the total number of nodes (num_nodes), total number of edges (num_edges), and a crucial boolean flag (is_dag) indicating whether the pipeline is valid (i.e., contains no loops/cycles).
