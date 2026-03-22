import { Route, Routes } from "react-router";
import "./app.css";
import Home from "./routes/Home.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
