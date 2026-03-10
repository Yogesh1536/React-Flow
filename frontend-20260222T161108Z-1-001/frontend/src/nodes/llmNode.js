// llmNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

const LLM_INPUTS = [
  { id: 'system', label: 'System', top: 33 },
  { id: 'prompt', label: 'Prompt', top: 67 },
];

const LLM_OUTPUTS = [{ id: 'response', label: 'Response' }];

const LLM_MODELS = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  { value: 'claude-opus-4-6', label: 'Claude Opus 4.6' },
  { value: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6' },
  { value: 'claude-haiku-4-5', label: 'Claude Haiku 4.5' },
];

export const LLMNode = ({ id, data, selected }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');

  return (
    <BaseNode
      id={id}
      type="llm"
      inputs={LLM_INPUTS}
      outputs={LLM_OUTPUTS}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Model</label>
        <select
          className="node-select"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          {LLM_MODELS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
};
