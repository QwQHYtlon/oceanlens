import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <a className="skip-link" href="#main-content">
        跳到主要內容
      </a>
      <Navbar />
      <main id="main-content" className="main-layout__content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
