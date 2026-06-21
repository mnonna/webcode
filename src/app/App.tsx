import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToHash from './components/ScrollToHash';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kontakt" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

