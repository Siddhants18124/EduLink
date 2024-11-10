import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './pages/sign-up/Signup';
import Login from './pages/login/Login';
import Home from "./pages/home/Home";
import Question from "./pages/question/Question";
import Profile from "./pages/profile/Profile";
// import Resources from "./components/SearchBars/Resources";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/question" element={<Question />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
