import Forms from "./components/forms";
import Navbar from "./components/navbar";
import Viewproj from "./components/viewproj";
import Approve from "./components/approve";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Forms/>}></Route>

        <Route path="/myproj" element={<Viewproj />}></Route>
        <Route path="/approve" element={<Approve/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
