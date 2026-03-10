// filterNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

const FILTER_INPUTS = [
  { id: 'data', label: 'Data' },
  { id: 'condition', label: 'Condition' },
];

const FILTER_OUTPUTS = [{ id: 'result', label: 'Result' }];

export const FilterNode = ({ id, data, selected }) => {
  const [expression, setExpression] = useState(data?.expression || '');

  return (
    <BaseNode
      id={id}
      type="filter"
      inputs={FILTER_INPUTS}
      outputs={FILTER_OUTPUTS}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Filter Expression</label>
        <input
          className="node-input"
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="e.g. value > 10"
        />
      </div>
    </BaseNode>
  );
};
