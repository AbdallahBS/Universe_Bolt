import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StagePage from './pages/StagePage';
import CycleIngenieurPage from './pages/CycleIngenieurPage';
import UniversityDetailsPage from './pages/UniversityDetailsPage';
import ScoreComparisonPage from './pages/ScoreComparisonPage';
import OrientationPage from './pages/OrientationPage';

function App() {
  const [language, setLanguage] = useState<string>('en');

  return (
    <Router>
      <div className="min-h-screen">
        <Header language={language} onLanguageChange={setLanguage} />
        <Routes>
          {/* Keep cycle-ingenieur, orientation, and university details routes active */}
          <Route path="/cycle-ingenieur" element={<CycleIngenieurPage language={language} />} />
          <Route path="/university/:id" element={<UniversityDetailsPage />} />
          <Route path="/orientation" element={<OrientationPage language={language} />} />
          
          {/* Redirect all other routes to /cycle-ingenieur */}
          <Route path="/" element={<Navigate to="/cycle-ingenieur" replace />} />
          <Route path="/stage" element={<Navigate to="/cycle-ingenieur" replace />} />
          <Route path="/login" element={<Navigate to="/cycle-ingenieur" replace />} />
          <Route path="/signup" element={<Navigate to="/cycle-ingenieur" replace />} />
          <Route path="/score-comparison" element={<Navigate to="/cycle-ingenieur" replace />} />
          <Route path="*" element={<Navigate to="/cycle-ingenieur" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;