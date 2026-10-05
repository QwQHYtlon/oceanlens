import React from 'react';
import { AlertCircle, XCircle, CameraOff, AlertTriangle } from 'lucide-react';
import Button from '../Button/Button';
import './ARError.css';

const ARError = ({ 
  errorType = 'general',
  message = '3D 模型載入失敗',
  onRetry,
  onView3D,
  onClose
}) => {
  const errorConfig = {
    camera_denied: {
      icon: CameraOff,
      title: '相機權限被拒絕',
      message: '無法使用 AR，請允許相機權限後重試'
    },
    camera_unavailable: {
      icon: AlertTriangle,
      title: '相機無法使用',
      message: '您的裝置不支援相機或相機被其他應用佔用'
    },
    browser_unsupported: {
      icon: AlertCircle,
      title: '瀏覽器不支援',
      message: '您的瀏覽器不支援 WebAR，請使用最新版 Chrome 或 Safari'
    },
    ar_init_failed: {
      icon: AlertTriangle,
      title: 'AR 初始化失敗',
      message: '無法初始化 AR 系統，請重新整理頁面'
    },
    marker_not_detected: {
      icon: AlertCircle,
      title: '無法偵測 Marker',
      message: '請確保 OceanLens Marker 清晰可見並重新嘗試'
    },
    model_loading_failed: {
      icon: XCircle,
      title: '模型載入失敗',
      message: '無法載入 3D 模型，請檢查網路連線'
    },
    general: {
      icon: XCircle,
      title: '載入失敗',
      message: message
    }
  };
  
  const config = errorConfig[errorType] || errorConfig.general;
  const Icon = config.icon;
  
  return (
    <div className="ar-error">
      <Icon className="ar-error__icon" size={48} />
      <h3 className="ar-error__title">{config.title}</h3>
      <p className="ar-error__message">{config.message}</p>
      <div className="ar-error__actions">
        {onRetry && (
          <Button onClick={onRetry} variant="primary" size="small">
            重新載入
          </Button>
        )}
        {onView3D && (
          <Button onClick={onView3D} variant="secondary" size="small">
            查看 3D 模型
          </Button>
        )}
        {onClose && (
          <Button onClick={onClose} variant="ghost" size="small">
            返回
          </Button>
        )}
      </div>
    </div>
  );
};

export default ARError;
