import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import MoodPage from "../pages/MoodPage";
import PlayListPage from "../pages/PlayListPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mood" element={<MoodPage />} />
        <Route path="/playlist" element={<PlayListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
