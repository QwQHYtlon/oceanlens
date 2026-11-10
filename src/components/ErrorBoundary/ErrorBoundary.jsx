import { Component } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[OceanLens] Render error caught by boundary:', error, info);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    const { children, fallback, title = '這個區塊載入失敗', message } = this.props;
    const { hasError, error } = this.state;

    if (!hasError) return children;

    if (typeof fallback === 'function') {
      return fallback({ error, reset: this.handleReset });
    }

    if (fallback) return fallback;

    return (
      <div className="error-boundary" role="alert">
        <AlertTriangle className="error-boundary__icon" size={44} aria-hidden="true" />
        <h3 className="error-boundary__title">{title}</h3>
        <p className="error-boundary__message">
          {message || '發生未預期的錯誤。你可以重試，或重新整理頁面。'}
        </p>
        <div className="error-boundary__actions">
          <button type="button" className="error-boundary__button" onClick={this.handleReset}>
            <RotateCcw size={16} aria-hidden="true" />
            再試一次
          </button>
          <button
            type="button"
            className="error-boundary__button error-boundary__button--ghost"
            onClick={() => window.location.reload()}
          >
            重新整理
          </button>
        </div>
        {import.meta.env.DEV && error?.message && (
          <pre className="error-boundary__debug">{error.message}</pre>
        )}
      </div>
    );
  }
}

export default ErrorBoundary;
