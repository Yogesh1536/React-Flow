// mergeNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

const MERGE_INPUTS = [
  { id: 'input1', label: 'Input 1' },
  { id: 'input2', label: 'Input 2' },
];

const MERGE_OUTPUTS = [{ id: 'merged', label: 'Merged' }];

const MERGE_STRATEGIES = [
  { value: 'concat', label: 'Concatenate' },
  { value: 'zip', label: 'Zip' },
  { value: 'union', label: 'Union' },
  { value: 'intersect', label: 'Intersect' },
];

export const MergeNode = ({ id, data, selected }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  return (
    <BaseNode
      id={id}
      type="merge"
      inputs={MERGE_INPUTS}
      outputs={MERGE_OUTPUTS}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Merge Strategy</label>
        <select
          className="node-select"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        >
          {MERGE_STRATEGIES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
};
