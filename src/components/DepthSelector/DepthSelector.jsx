import React from 'react';
import './DepthSelector.css';

const DepthSelector = ({ depths, selectedDepth, onSelect }) => {
  return (
    <div className="depth-selector">
      <div className="depth-selector__track">
        {depths.map((depth, index) => (
          <button
            key={depth.depth}
            className={`depth-selector__point ${selectedDepth === depth.depth ? 'depth-selector__point--active' : ''}`}
            onClick={() => onSelect(depth)}
            style={{ 
              left: `${(index / (depths.length - 1)) * 100}%`,
              borderColor: depth.color
            }}
          >
            <span className="depth-selector__label">{depth.depth}m</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepthSelector;
