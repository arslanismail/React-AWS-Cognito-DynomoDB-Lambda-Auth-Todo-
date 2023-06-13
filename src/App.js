import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./components/Auth/AuthContext";
import Nav from "./components/Header/Nav";
import Home from "./components/Home";
import Signin from "./components/SignIn";
import Signup from "./components/Signup";
import SecondHome from "./components/SecondHome";
import Confirmation from "./components/Confirmation";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/secondhome" element={<SecondHome />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/confirm" element={<Confirmation />} />
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default App;
