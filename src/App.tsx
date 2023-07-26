
import React from 'react';
import TwoFactorAuthList from './components/TwoFactorAuthList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import AddCodePage from './components/AddCodePage';

function App() {
  return (
    <div className="container">
      <h1>Two-Factor Authentication Codes</h1>
      <Router >
      <Routes>
            <Route path={''} element={<TwoFactorAuthList />} />
            <Route path={'/add'} element={<AddCodePage />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
