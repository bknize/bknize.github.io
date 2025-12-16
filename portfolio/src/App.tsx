import { Route, Routes } from "react-router";
import "./app.css";
import CaseStudy from "./routes/CaseStudy";
import Home from "./routes/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={<CaseStudy />} />
      </Routes>
    </>
  );
}

export default App;
