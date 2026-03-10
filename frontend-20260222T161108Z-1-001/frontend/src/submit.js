// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { PipelineResultModal } from './components/PipelineResultModal';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error ${response.status}: ${text}`);
      }

      const data = await response.json();
      setResult({
        numNodes: data.num_nodes,
        numEdges: data.num_edges,
        isDag: data.is_dag,
      });
    } catch (err) {
      setError(err.message || 'Failed to connect to the backend.');
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  return (
    <div className="submit-area">
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="submit-button-spinner" />
            Analysing…
          </>
        ) : (
          <>▶ Submit Pipeline</>
        )}
      </button>

      {modalOpen && (
        <PipelineResultModal
          result={result}
          error={error}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
