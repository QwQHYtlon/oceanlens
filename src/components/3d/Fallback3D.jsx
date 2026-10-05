import React from 'react';
import { AlertCircle } from 'lucide-react';
import Button from '../Button/Button';
import './Fallback3D.css';

const Fallback3D = ({ message = '3D 模型暫時無法載入', onRetry }) => {
  return (
    <div className="fallback-3d">
      <AlertCircle className="fallback-3d__icon" size={48} />
      <h3 className="fallback-3d__title">載入失敗</h3>
      <p className="fallback-3d__message">{message}</p>
      <div className="fallback-3d__actions">
        {onRetry && (
          <Button onClick={onRetry} variant="primary" size="small">
            重新載入
          </Button>
        )}
      </div>
    </div>
  );
};

export default Fallback3D;
