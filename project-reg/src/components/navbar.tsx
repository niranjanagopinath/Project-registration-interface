import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar: React.FC = () => {
  return (
   
      <nav className="navbar">
          <ul className="list">
            <li className="comp">
              <Link to="/" className="link">
                Home{" "}
              </Link>
            </li>
            <li className="comp">
              <Link to="/register" className="link">
                Register
              </Link>
            </li>
            <li className="comp">
              <Link to="/myproj" className="link">
                View Projects
              </Link>
            </li>
          </ul>
        
      </nav>
    
  );
};
export default Navbar;
