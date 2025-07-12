import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from './pages/About';




function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

      <Navbar />

      <div className="min-h-[calc(100vh-5rem)] pt-20 pb-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
