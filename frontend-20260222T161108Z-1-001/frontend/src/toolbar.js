// toolbar.js

import { DraggableNode } from './draggableNode';

const IO_NODES = [
  { type: 'customInput', label: 'Input' },
  { type: 'customOutput', label: 'Output' },
  { type: 'text', label: 'Text' },
];

const PROCESSING_NODES = [
  { type: 'llm', label: 'LLM' },
  { type: 'transform', label: 'Transform' },
  { type: 'condition', label: 'Condition' },
];

const UTILITY_NODES = [
  { type: 'filter', label: 'Filter' },
  { type: 'api', label: 'API' },
  { type: 'merge', label: 'Merge' },
];

const ToolbarSection = ({ label, nodes }) => (
  <div>
    <div className="toolbar-section-label">{label}</div>
    <div className="toolbar-section-nodes">
      {nodes.map(({ type, label: nodeLabel }) => (
        <DraggableNode key={type} type={type} label={nodeLabel} />
      ))}
    </div>
  </div>
);

export const PipelineToolbar = () => (
  <div className="pipeline-toolbar">
    <ToolbarSection label="I / O" nodes={IO_NODES} />
    <ToolbarSection label="Processing" nodes={PROCESSING_NODES} />
    <ToolbarSection label="Utility" nodes={UTILITY_NODES} />
  </div>
);
