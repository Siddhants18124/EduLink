// Module------------------------------------
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages-------------------------------------
import Signup from './pages/sign-up/Signup';
import Login from './pages/login/Login';
import Home from "./pages/home/Home";
import Question from "./pages/question/Question";
import Profile from "./pages/profile/Profile";
import Resources from "./pages/resources/Resources";
import { useSelector } from "react-redux";
// import Resources from "./components/SearchBars/Resources";


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/question" element={<Question />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
