// transformNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

const TRANSFORM_INPUTS = [{ id: 'input', label: 'Input' }];
const TRANSFORM_OUTPUTS = [{ id: 'output', label: 'Output' }];

const DEFAULT_CODE = `(input) => {
  // Transform input here
  return input;
}`;

export const TransformNode = ({ id, data, selected }) => {
  const [code, setCode] = useState(data?.code || DEFAULT_CODE);

  return (
    <BaseNode
      id={id}
      type="transform"
      inputs={TRANSFORM_INPUTS}
      outputs={TRANSFORM_OUTPUTS}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Transform Function</label>
        <textarea
          className="node-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={5}
          style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}
        />
      </div>
    </BaseNode>
  );
};
