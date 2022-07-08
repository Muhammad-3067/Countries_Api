import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryDataCard from "./components/country-data-page/CountryDataCard";
import Main from "./components/main/Main";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark-mode-app" : "light-mode-app"}>
      <BrowserRouter>
        <nav className="navbar">
          <h2>Where is the world?</h2>
          <div className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <BsSun className="sun-icon" />
            ) : (
              <BsFillMoonStarsFill className="moon-icon" />
            )}
            {darkMode ? <p>Light Mode</p> : <p>Dark Mode</p>}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="country-card" element={<CountryDataCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
