import {Link} from "react-router-dom";
import "./navbar.css"

const Navbar: React.FC=()=>{
    return(
<div className="body">
    <nav className="navbar">
        <div className="con">
        <ul className="list"> 
        <li className="comp">
            <Link to="/" className="link">home </Link>
        </li>
        <li className="comp">
            <Link to="/register" className="link">Register</Link>
        </li>
        <li  className="comp">
            <Link to="/myproj" className="link">project</Link>

        </li>
        </ul>
        </div>
    </nav>
    </div>
  

    
   
    );
};
export default Navbar;