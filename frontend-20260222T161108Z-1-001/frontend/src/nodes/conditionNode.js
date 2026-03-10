// conditionNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

const CONDITION_INPUTS = [{ id: 'input', label: 'Input' }];

const CONDITION_OUTPUTS = [
  { id: 'true', label: 'True', top: 33 },
  { id: 'false', label: 'False', top: 67 },
];

export const ConditionNode = ({ id, data, selected }) => {
  const [expression, setExpression] = useState(data?.expression || '');

  return (
    <BaseNode
      id={id}
      type="condition"
      inputs={CONDITION_INPUTS}
      outputs={CONDITION_OUTPUTS}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Condition Expression</label>
        <input
          className="node-input"
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="e.g. input.status === 'active'"
        />
      </div>
    </BaseNode>
  );
};
