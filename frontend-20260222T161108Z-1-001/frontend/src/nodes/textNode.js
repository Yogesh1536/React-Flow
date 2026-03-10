// textNode.js — Part 3: auto-resize + dynamic {{variable}} handles

import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';

const MIN_WIDTH = 220;
const MAX_WIDTH = 500;

/**
 * Measures the pixel width of the longest line in `text`
 * using an off-screen canvas.
 */
const measureTextWidth = (text, font = '12px Inter, sans-serif') => {
  const canvas =
    measureTextWidth._canvas ||
    (measureTextWidth._canvas = document.createElement('canvas'));
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  const lines = text.split('\n');
  return Math.max(...lines.map((l) => ctx.measureText(l).width));
};

/**
 * Extracts unique variable names from {{varName}} patterns.
 */
const extractVariables = (text) => {
  const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
  const seen = new Set();
  let m;
  while ((m = regex.exec(text)) !== null) {
    seen.add(m[1].trim());
  }
  return [...seen];
};

const TEXT_OUTPUTS = [{ id: 'output', label: 'Output' }];

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const [nodeWidth, setNodeWidth] = useState(MIN_WIDTH);
  const textareaRef = useRef(null);

  // Update variables and width whenever text changes
  useEffect(() => {
    setVariables(extractVariables(currText));

    // Auto-resize height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    // Auto-resize width
    const longestLineWidth = measureTextWidth(currText);
    const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, longestLineWidth + 80));
    setNodeWidth(newWidth);
  }, [currText]);

  const inputs = variables.map((v, i) => ({
    id: v,
    label: v,
    top:
      variables.length === 1
        ? 50
        : Math.round(((i + 1) / (variables.length + 1)) * 100),
  }));

  return (
    <BaseNode
      id={id}
      type="text"
      inputs={inputs}
      outputs={TEXT_OUTPUTS}
      selected={selected}
      width={nodeWidth}
    >
      <div className="node-field">
        <label className="node-field-label">Text</label>
        <textarea
          ref={textareaRef}
          className="node-textarea"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Type text with {{variables}}..."
          rows={1}
        />
      </div>
    </BaseNode>
  );
};
