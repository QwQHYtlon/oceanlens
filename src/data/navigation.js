export const navItems = [
  { path: '/', label: '首頁' },
  { path: '/explore', label: '探索海洋' },
  { path: '/species', label: '海洋生物' },
  { path: '/simulation', label: '生態模擬' },
  { path: '/ai', label: 'AI 科普' }
];

export const isNavItemActive = (itemPath, pathname) => {
  if (itemPath === '/') return pathname === '/';
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
};
