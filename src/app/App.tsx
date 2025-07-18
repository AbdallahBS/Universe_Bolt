import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CycleIngenieurPage from '../pages/CycleIngenieurPage';
import UniversityDetailsPage from '../pages/UniversityDetailsPage';
import ScoreComparisonPage from '../pages/ScoreComparisonPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cycle-ingenieur" element={<CycleIngenieurPage />} />
        <Route path="/university/:id" element={<UniversityDetailsPage />} />
        <Route path="/score-comparison" element={<ScoreComparisonPage />} />
      </Routes>
    </Router>
  );
};

export default App;