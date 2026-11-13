import './DepthSelector.css';

const DepthSelector = ({ depths, selectedDepth, onSelect }) => {
  return (
    <div className="depth-selector">
      <div className="depth-selector__track" role="group" aria-label="選擇海洋深度">
        {depths.map((depth) => {
          const isActive = selectedDepth === depth.depth;
          const zoneName = depth.zone.split(' (')[0];
          return (
            <button
              key={depth.depth}
              type="button"
              className={`depth-selector__point ${isActive ? 'depth-selector__point--active' : ''}`}
              onClick={() => onSelect(depth)}
              aria-pressed={isActive}
              aria-label={`${depth.depth}m，${depth.zone}`}
              title={`${depth.depth}m — ${depth.zone}`}
              style={{ '--depth-color': depth.color }}
            >
              <span className="depth-selector__marker" aria-hidden="true" />
              <span className="depth-selector__text">
                <span className="depth-selector__label">{depth.depth}m</span>
                <span className="depth-selector__zone">{zoneName}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="depth-selector__hint">由淺至深，點選任一深度查看環境與生物</p>
    </div>
  );
};

export default DepthSelector;
