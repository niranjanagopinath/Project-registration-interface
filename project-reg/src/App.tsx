import Forms from "./components/forms";
import Navbar from "./components/navbar";
import Viewproj from "./components/viewproj";
import Approve from "./components/approve";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Forms />}></Route>
        <Route path="/myproj" element={<Viewproj />}></Route>
        <Route path="/approve" element={<Approve/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
