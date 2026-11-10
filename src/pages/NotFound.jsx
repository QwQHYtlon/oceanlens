import { Link } from 'react-router-dom';
import { Compass, Fish } from 'lucide-react';
import Button from '../components/Button/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './NotFound.css';

const NotFound = () => {
  useDocumentTitle('找不到頁面');

  return (
    <div className="not-found">
      <div className="container not-found__content">
        <div className="not-found__illustration" aria-hidden="true">
          <Fish className="not-found__fish" size={72} />
          <span className="not-found__code">404</span>
        </div>
        <h1 className="not-found__title">這片海域找不到頁面</h1>
        <p className="not-found__description">
          你探索的連結可能已經移動，或從來不存在。回到首頁，繼續探索海洋吧。
        </p>
        <div className="not-found__actions">
          <Button to="/" variant="primary" size="large">
            <Compass size={18} />
            回到首頁
          </Button>
          <Button to="/species" variant="secondary" size="large">
            瀏覽海洋生物
          </Button>
        </div>
        <Link to="/explore" className="not-found__link">
          或繼續探索海洋深度 →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
