import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './pages/sign-up/Signup';
import Login from './pages/login/Login';
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
