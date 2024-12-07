import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AnalysisPage from './AnalysisPage';
import NavBar from './NavBar';

const App: React.FC = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/analysis/:analysisType" element={<AnalysisPage />} />
            </Routes>
        </Router>
    );
};

export default App;