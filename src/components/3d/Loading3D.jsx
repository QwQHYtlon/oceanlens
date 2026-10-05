import React from 'react';
import './Loading3D.css';

const Loading3D = ({ message = '正在載入海洋環境……' }) => {
  return (
    <div className="loading-3d">
      <div className="loading-3d__spinner">
        <div className="loading-3d__bubble loading-3d__bubble--1"></div>
        <div className="loading-3d__bubble loading-3d__bubble--2"></div>
        <div className="loading-3d__bubble loading-3d__bubble--3"></div>
      </div>
      <p className="loading-3d__message">{message}</p>
    </div>
  );
};

export default Loading3D;
