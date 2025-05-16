
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components1/Header/Header';
import Footer from './components1/Footer/Footer';
import Home from './pages1/Home';
import About from './pages1/About';
import Contact from './pages1/Contact';
import Profile from './pages1/Profile';
import Login from './components1/Auth/Login';
import Signup from './components1/Auth/Signup';
// import Login from './pages1/Login';
import AuthOptions from './pages1/AuthOptions';
import { Navigate } from "react-router-dom";


import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="content-wrapper">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth" element={<AuthOptions />} />
             
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;