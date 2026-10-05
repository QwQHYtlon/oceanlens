import React from 'react';
import './ARLoading.css';

const ARLoading = ({ 
  message = '正在載入海洋生物……',
  step = 'initial' // initial, camera, marker, model
}) => {
  const stepMessages = {
    initial: '正在啟動 AR…',
    camera: '正在開啟相機…',
    marker: '請對準 OceanLens Marker',
    model: '正在載入海洋生物…'
  };
  
  const displayMessage = stepMessages[step] || message;
  
  return (
    <div className="ar-loading">
      <div className="ar-loading__spinner">
        <div className="ar-loading__wave ar-loading__wave--1"></div>
        <div className="ar-loading__wave ar-loading__wave--2"></div>
        <div className="ar-loading__wave ar-loading__wave--3"></div>
      </div>
      <p className="ar-loading__message">{displayMessage}</p>
    </div>
  );
};

export default ARLoading;
