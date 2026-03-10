// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

const INPUT_OUTPUTS = [{ id: 'value', label: 'Value' }];

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      type="customInput"
      inputs={[]}
      outputs={INPUT_OUTPUTS}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Name</label>
        <input
          className="node-input"
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </div>
      <div className="node-field">
        <label className="node-field-label">Type</label>
        <select
          className="node-select"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
