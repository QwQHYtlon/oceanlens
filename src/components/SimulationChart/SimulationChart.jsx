import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartCard from '../ChartCard/ChartCard';
import './SimulationChart.css';

const TOOLTIP_STYLE = {
  backgroundColor: 'rgba(10, 25, 47, 0.95)',
  border: '1px solid rgba(100, 255, 218, 0.3)',
  borderRadius: '8px',
  color: '#e6f1ff',
};

const SimulationChart = ({
  title,
  data,
  xLabel,
  lineName,
  color,
  referenceX,
  referenceLabel,
  currentLabel,
  currentValue,
}) => {
  const hasCurrentValue = Number.isFinite(currentValue);
  const xMin = data[0]?.x;
  const xMax = data[data.length - 1]?.x;
  const showReference =
    typeof referenceX === 'number' && referenceX > xMin && referenceX < xMax;

  return (
    <ChartCard title={title}>
      <div
        className="simulation-chart"
        role="img"
        aria-label={`${title}。${
          hasCurrentValue && currentLabel
            ? `${currentLabel}，${lineName} ${currentValue}%。`
            : ''
        }`}
      >
        {hasCurrentValue && currentLabel && (
          <p className="simulation-chart__current">
            {currentLabel}
            <span aria-hidden="true"> · </span>
            <strong>
              {lineName} {currentValue}%
            </strong>
          </p>
        )}
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 12, right: 18, left: -6, bottom: 22 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="x"
              type="number"
              domain={['dataMin', 'dataMax']}
              tickCount={6}
              stroke="#8892b0"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              label={{
                value: xLabel,
                position: 'insideBottom',
                offset: -14,
                fill: '#8892b0',
                fontSize: 12,
              }}
            />
            <YAxis
              domain={[0, 100]}
              tickCount={5}
              width={48}
              stroke="#8892b0"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              itemStyle={{ color: '#e6f1ff' }}
              labelStyle={{ color: '#8892b0' }}
              formatter={(value) => [`${value}%`, lineName]}
              labelFormatter={(value) => `${xLabel}: ${value}`}
            />
            {showReference && (
              <ReferenceLine
                x={referenceX}
                stroke="rgba(255,255,255,0.4)"
                strokeDasharray="4 4"
                label={{
                  value: referenceLabel || '目前',
                  position: 'insideTopRight',
                  fill: '#e6f1ff',
                  fontSize: 11,
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="y"
              name={lineName}
              stroke={color}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="sr-only">
          <table>
            <caption>
              {title}：{lineName}對{xLabel}
            </caption>
            <thead>
              <tr>
                <th scope="col">{xLabel}</th>
                <th scope="col">{lineName}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((point) => (
                <tr key={point.x}>
                  <td>{point.x}</td>
                  <td>{point.y}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ChartCard>
  );
};

export default SimulationChart;
