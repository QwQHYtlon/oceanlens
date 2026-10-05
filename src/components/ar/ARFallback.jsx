import React from 'react';
import { Smartphone, QrCode } from 'lucide-react';
import Button from '../Button/Button';
import { QRCodeSVG } from 'qrcode.react';
import './ARFallback.css';

const ARFallback = ({ onView3D, currentUrl }) => {
  const qrValue = currentUrl || window.location.href;
  
  return (
    <div className="ar-fallback">
      <div className="ar-fallback__content">
        <Smartphone className="ar-fallback__icon" size={64} />
        <h2 className="ar-fallback__title">AR 體驗請使用手機開啟</h2>
        <p className="ar-fallback__message">
          桌面電腦不支援 AR 功能。請使用手機或平板掃描下方 QR Code，
          或直接在手機上開啟此頁面。
        </p>
        
        <div className="ar-fallback__qr">
          <div className="ar-fallback__qr-code">
            <QRCodeSVG 
              value={qrValue}
              size={180}
              fg="#00f5d4"
              bg="#0a192f"
              level="M"
              includeMargin={true}
            />
          </div>
          <p className="ar-fallback__qr-label">掃描 QR Code 開啟 AR</p>
        </div>
        
        <div className="ar-fallback__actions">
          <Button onClick={onView3D} variant="primary" size="medium">
            查看 3D 模型
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ARFallback;
