import './PageLoader.css';

const PageLoader = ({ message = '正在載入頁面…' }) => {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader__bubbles" aria-hidden="true">
        <span className="page-loader__bubble page-loader__bubble--1" />
        <span className="page-loader__bubble page-loader__bubble--2" />
        <span className="page-loader__bubble page-loader__bubble--3" />
      </div>
      <p className="page-loader__message">{message}</p>
    </div>
  );
};

export default PageLoader;
