// draggableNode.js

const NODE_ICONS = {
  customInput: '⬇️',
  customOutput: '⬆️',
  llm: '🤖',
  text: '📝',
  filter: '🔍',
  api: '🌐',
  merge: '🔀',
  transform: '⚙️',
  condition: '❓',
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className="draggable-node-icon">{NODE_ICONS[type] || '◆'}</div>
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};
