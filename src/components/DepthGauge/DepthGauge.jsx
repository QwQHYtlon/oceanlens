import {
  DEPTH_ZONES,
  getDeepestZone,
  getDepthZoneLabel,
  getDepthZones,
  parseDepth,
} from '../../utils/depth.js';
import './DepthGauge.css';

const DepthGauge = ({ depth }) => {
  const zones = getDepthZones(depth);
  const activeIds = new Set(zones.map((zone) => zone.id));
  const deepest = getDeepestZone(depth);
  const label = getDepthZoneLabel(depth);
  const range = parseDepth(depth);

  return (
    <div
      className="depth-gauge"
      role="img"
      aria-label={`深度位置：${depth}，${label}，最深可達 ${deepest?.name ?? '未知'}。`}
    >
      <div className="depth-gauge__bar" aria-hidden="true">
        {DEPTH_ZONES.map((zone) => (
          <span
            key={zone.id}
            className={`depth-gauge__segment ${
              activeIds.has(zone.id) ? 'depth-gauge__segment--active' : ''
            }`}
            style={{ '--zone-color': zone.color }}
            title={`${zone.name}（${zone.englishName}）`}
          />
        ))}
      </div>

      <div className="depth-gauge__ticks" aria-hidden="true">
        <span>0m</span>
        <span>200m</span>
        <span>1000m</span>
        <span>4000m</span>
        <span>6000m+</span>
      </div>

      <div className="depth-gauge__tags">
        {zones.map((zone) => (
          <span
            key={zone.id}
            className="depth-gauge__tag"
            style={{ '--zone-color': zone.color }}
          >
            {zone.name}
          </span>
        ))}
      </div>

      <div className="depth-gauge__summary">
        <span className="depth-gauge__range">
          {range.valid ? depth : '深度資料不足'}
        </span>
        <span className="depth-gauge__label">{label}</span>
      </div>

      {deepest && (
        <p className="depth-gauge__deepest">
          最深可達 <strong>{deepest.name}</strong>
          <span>（{deepest.englishName}）</span>
        </p>
      )}
    </div>
  );
};

export default DepthGauge;
