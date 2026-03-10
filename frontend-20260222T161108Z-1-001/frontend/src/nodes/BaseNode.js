// BaseNode.js — Core abstraction for all pipeline nodes

import { Handle, Position } from 'reactflow';

const NODE_CONFIGS = {
  customInput: {
    label: 'Input',
    icon: '⬇️',
    color: '#34d399',
  },
  customOutput: {
    label: 'Output',
    icon: '⬆️',
    color: '#fbbf24',
  },
  llm: {
    label: 'LLM',
    icon: '🤖',
    color: '#a78bfa',
  },
  text: {
    label: 'Text',
    icon: '📝',
    color: '#60a5fa',
  },
  filter: {
    label: 'Filter',
    icon: '🔍',
    color: '#f87171',
  },
  api: {
    label: 'API',
    icon: '🌐',
    color: '#22d3ee',
  },
  merge: {
    label: 'Merge',
    icon: '🔀',
    color: '#fb923c',
  },
  transform: {
    label: 'Transform',
    icon: '⚙️',
    color: '#a3e635',
  },
  condition: {
    label: 'Condition',
    icon: '❓',
    color: '#f472b6',
  },
};

/**
 * Distributes handles evenly along the vertical axis.
 * Returns percentage top values for each handle.
 */
const distributeHandles = (count) => {
  if (count === 1) return [50];
  return Array.from({ length: count }, (_, i) =>
    Math.round(((i + 1) / (count + 1)) * 100)
  );
};

/**
 * BaseNode — shared card container for all node types.
 *
 * @param {string}   id       — ReactFlow node id
 * @param {string}   type     — node type key (matches NODE_CONFIGS)
 * @param {Array}    inputs   — [{ id, label, top? }] left-side target handles
 * @param {Array}    outputs  — [{ id, label, top? }] right-side source handles
 * @param {ReactNode} children — body content
 * @param {number}   width    — optional explicit width (px)
 * @param {boolean}  selected — whether node is selected
 */
export const BaseNode = ({
  id,
  type,
  inputs = [],
  outputs = [],
  children,
  width,
  selected,
}) => {
  const config = NODE_CONFIGS[type] || {
    label: type,
    icon: '◆',
    color: '#6c63ff',
  };

  const inputTops =
    inputs.length > 0
      ? distributeHandles(inputs.length)
      : [];

  const outputTops =
    outputs.length > 0
      ? distributeHandles(outputs.length)
      : [];

  return (
    <div
      className={`base-node${selected ? ' selected' : ''}`}
      style={{ width: width ? `${width}px` : undefined }}
    >
      {/* Header */}
      <div className={`node-header ${type}`}>
        <span className="node-header-icon">{config.icon}</span>
        <span className={`node-header-title ${type}`}>{config.label}</span>
      </div>

      {/* Body */}
      <div className="node-body">{children}</div>

      {/* Input handles (left side) */}
      {inputs.map((handle, i) => {
        const top = handle.top !== undefined ? handle.top : inputTops[i];
        return (
          <Handle
            key={`input-${handle.id}`}
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
            className={type}
            style={{ top: `${top}%` }}
            title={handle.label}
          />
        );
      })}

      {/* Output handles (right side) */}
      {outputs.map((handle, i) => {
        const top = handle.top !== undefined ? handle.top : outputTops[i];
        return (
          <Handle
            key={`output-${handle.id}`}
            type="source"
            position={Position.Right}
            id={`${id}-${handle.id}`}
            className={type}
            style={{ top: `${top}%` }}
            title={handle.label}
          />
        );
      })}
    </div>
  );
};
