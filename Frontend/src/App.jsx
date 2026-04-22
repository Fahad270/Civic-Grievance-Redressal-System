import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Raise from "./pages/Raise";
import Feed from "./pages/Feed";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/raise" element={<Raise />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;