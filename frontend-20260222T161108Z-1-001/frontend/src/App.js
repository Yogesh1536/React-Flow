// App.js

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-icon">⚡</div>
          <span className="app-logo-text">
            VectorShift
            <span className="app-logo-subtitle">Pipeline Builder</span>
          </span>
        </div>
        <div className="app-header-actions">
          <SubmitButton />
        </div>
      </header>

      {/* Body: sidebar + canvas */}
      <div className="app-body">
        <PipelineToolbar />
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
