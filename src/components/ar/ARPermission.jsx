import React from 'react';
import { Camera, X } from 'lucide-react';
import Button from '../Button/Button';
import './ARPermission.css';

const ARPermission = ({ 
  onAllow,
  onDeny,
  message = 'OceanLens AR 需要使用你的相機。'
}) => {
  return (
    <div className="ar-permission">
      <div className="ar-permission__content">
        <Camera className="ar-permission__icon" size={64} />
        <h2 className="ar-permission__title">相機權限</h2>
        <p className="ar-permission__message">{message}</p>
        <div className="ar-permission__actions">
          <Button onClick={onAllow} variant="primary" size="medium">
            允許相機
          </Button>
          <Button onClick={onDeny} variant="ghost" size="medium">
            <X size={16} />
            返回
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ARPermission;
