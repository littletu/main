import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Selected from './pages/Selected';
import Projects from './pages/Projects';
import About from './pages/About';
import Recruit from './pages/Recruit';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './index.css';

function App() {
  return (
    <Router>
      <div className="layout-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selected" element={<Selected />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
