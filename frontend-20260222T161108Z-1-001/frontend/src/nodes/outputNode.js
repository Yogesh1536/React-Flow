// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

const OUTPUT_INPUTS = [{ id: 'value', label: 'Value' }];

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      type="customOutput"
      inputs={OUTPUT_INPUTS}
      outputs={[]}
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
