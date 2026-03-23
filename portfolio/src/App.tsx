import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import "./app.css";
import Home from "./routes/Home.tsx";
import CaseStudy from "./routes/CaseStudy.tsx";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/:slug" element={<CaseStudy />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
