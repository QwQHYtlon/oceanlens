import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Species from './pages/Species';
import SpeciesDetail from './pages/SpeciesDetail';
import Simulation from './pages/Simulation';
import AI from './pages/AI';
import './styles/global.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/species" element={<Species />} />
          <Route path="/species/:id" element={<SpeciesDetail />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/ai" element={<AI />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
