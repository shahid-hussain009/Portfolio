import { useState } from 'react';
import './App.css';
import { Login } from './components/AuthCompnent/Login';
import { SignUp } from './components/AuthCompnent/SignUp';
import { ProfileContext } from './components/hooks/ProfileContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    const [img_url, setImg_url] = useState('');
    return (
        <>
            <ProfileContext.Provider value={{ img_url, setImg_url }}>
                <Router>
                    <Routes>
                        <Route path="/sign-up" element={<SignUp/>} />
                        <Route path="/login" element={<Login/>} />
                    </Routes>
                </Router>
            </ProfileContext.Provider>
        </>
    );
}

export default App;
