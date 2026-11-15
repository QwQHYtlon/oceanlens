import { useId } from 'react';
import './OceanAiMark.css';

const OceanAiMark = ({ size = 48, className = '' }) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const bodyId = `${id}-body`;
  const glowId = `${id}-glow`;
  const bgId = `${id}-bg`;

  return (
    <svg
      className={`ocean-ai-mark ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={bgId} cx="0" cy="0" r="1" gradientTransform="translate(25 17) rotate(55) scale(55)">
          <stop stopColor="#0e3b5c" />
          <stop offset="1" stopColor="#03111f" />
        </radialGradient>
        <linearGradient id={bodyId} x1="20" y1="19" x2="45" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a7fff4" />
          <stop offset="0.5" stopColor="#00f5d4" />
          <stop offset="1" stopColor="#48cae4" />
        </linearGradient>
        <linearGradient id={glowId} x1="32" y1="8" x2="32" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00f5d4" stopOpacity="0.45" />
          <stop offset="1" stopColor="#0077b6" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="32" r="30" fill={`url(#${bgId})`} stroke="rgba(100,255,218,0.32)" />
      <circle cx="32" cy="32" r="24" stroke="rgba(100,255,218,0.16)" strokeDasharray="2 5" />
      <path d="M9 44c5-4 10-4 15 0s10 4 15 0 10-4 16 0" stroke="rgba(100,255,218,0.24)" strokeLinecap="round" />

      <path
        d="M19 30.5C19 22 24.8 16 32 16s13 6 13 14.5c0 1.4-1.1 2.5-2.5 2.5h-21c-1.4 0-2.5-1.1-2.5-2.5Z"
        fill={`url(#${bodyId})`}
        stroke="#d8fff9"
        strokeWidth="1.2"
      />
      <path d="M24 26.5c.6-4 3.3-6.3 6.7-6.6" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M23 34c0 4.5-3 6-2 11M29 34c0 5 2.5 6.5 1.5 12M35 34c0 5-2.5 6.5-1.5 12M41 34c0 4.5 3 6 2 11" stroke={`url(#${glowId})`} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M23 34c0 4.5-3 6-2 11M29 34c0 5 2.5 6.5 1.5 12M35 34c0 5-2.5 6.5-1.5 12M41 34c0 4.5 3 6 2 11" stroke="#90e0ef" strokeOpacity="0.75" strokeWidth="0.9" strokeLinecap="round" />

      <circle cx="47" cy="20" r="2" fill="#00f5d4" />
      <circle cx="49.5" cy="25.5" r="1" fill="#90e0ef" fillOpacity="0.8" />
      <path d="M14 22v5M11.5 24.5h5" stroke="#00f5d4" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M50 43v4M48 45h4" stroke="#90e0ef" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
};

export default OceanAiMark;
