// apiNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

const API_INPUTS = [
  { id: 'url', label: 'URL' },
  { id: 'params', label: 'Params' },
];

const API_OUTPUTS = [{ id: 'response', label: 'Response' }];

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export const APINode = ({ id, data, selected }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  return (
    <BaseNode
      id={id}
      type="api"
      inputs={API_INPUTS}
      outputs={API_OUTPUTS}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Method</label>
        <select
          className="node-select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          {HTTP_METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">URL</label>
        <input
          className="node-input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
        />
      </div>
    </BaseNode>
  );
};
