import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import Cards from "./components/Cards";
import MyCards from "./components/MyCards";
import About from "./components/About";
import BusinessRegister from "./components/BusinessRegister";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Footer from "./components/Footer";



function App() {

  let [isBusiness, setIsBusiness] = useState<boolean>(
    sessionStorage.getItem("userData") != null
      ? JSON.parse(sessionStorage.getItem("userData") as string).businessMan
      : false
  );
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    sessionStorage.getItem("userData") != null
      ? JSON.parse(sessionStorage.getItem("userData") as string).isLoggedIn
      : false
  );

  return (
    <div>
      <ToastContainer />
      <Router>
        <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} isBusiness={isBusiness} />
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setIsBusiness={setIsBusiness} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setIsBusiness={setIsBusiness} />} />
          <Route path="/businessregister" element={<BusinessRegister setIsLoggedIn={setIsLoggedIn} setIsBusiness={setIsBusiness} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/mycards" element={<MyCards />} />
          <Route path="/about" element={<About />} />
          <Footer />
        </Routes>
      </Router>
    </div>
  );
}

export default App;