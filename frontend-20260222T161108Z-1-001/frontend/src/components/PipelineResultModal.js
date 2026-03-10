// PipelineResultModal.js — displays pipeline analysis results

/**
 * @param {{ numNodes: number, numEdges: number, isDag: boolean } | null} result
 * @param {string | null} error
 * @param {() => void} onClose
 */
export const PipelineResultModal = ({ result, error, onClose }) => {
  const description = result
    ? buildDescription(result)
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <span className="modal-title">Pipeline Analysis</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {error ? (
          <div className="modal-error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        ) : result ? (
          <>
            <div className="modal-stats">
              {/* Nodes */}
              <div className="modal-stat-card">
                <span className="modal-stat-icon">🔷</span>
                <span className="modal-stat-value">{result.numNodes}</span>
                <span className="modal-stat-label">Nodes</span>
              </div>

              {/* Edges */}
              <div className="modal-stat-card">
                <span className="modal-stat-icon">🔗</span>
                <span className="modal-stat-value">{result.numEdges}</span>
                <span className="modal-stat-label">Edges</span>
              </div>

              {/* DAG Status */}
              <div className={`modal-stat-card ${result.isDag ? 'dag-valid' : 'dag-invalid'}`}>
                <span className="modal-stat-icon">{result.isDag ? '✅' : '❌'}</span>
                <span className={`modal-stat-value ${result.isDag ? 'dag-valid' : 'dag-invalid'}`}>
                  {result.isDag ? 'Valid' : 'Cycle!'}
                </span>
                <span className="modal-stat-label">DAG</span>
              </div>
            </div>

            <div className="modal-description">{description}</div>
          </>
        ) : null}
      </div>
    </div>
  );
};

const buildDescription = ({ numNodes, numEdges, isDag }) => {
  const nodeWord = numNodes === 1 ? 'node' : 'nodes';
  const edgeWord = numEdges === 1 ? 'edge' : 'edges';
  const dagStatus = isDag
    ? 'The pipeline is a valid Directed Acyclic Graph (DAG) — no cycles detected.'
    : 'The pipeline contains a cycle and is NOT a valid DAG. Check for circular dependencies.';
  return `Your pipeline has ${numNodes} ${nodeWord} and ${numEdges} ${edgeWord}. ${dagStatus}`;
};
