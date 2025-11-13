import { useState } from 'react';
import './App.css';
import { Login } from './components/AuthCompnent/Login';
import { SignUp } from './components/AuthCompnent/SignUp';
import { ProfileContext } from './components/hooks/ProfileContext';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';

function AppContent() {
    const [img_url, setImg_url] = useState('');
    const location = useLocation();

    // Check if current path is auth pages
    const isAuthPage = location.pathname === '/login' || location.pathname === '/sign-up';

    return (
        <ProfileContext.Provider value={{ img_url, setImg_url }}>
            {/* Only show Header if not on auth pages */}
            {!isAuthPage && <Header />}

            <Routes>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        
        </ProfileContext.Provider>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;