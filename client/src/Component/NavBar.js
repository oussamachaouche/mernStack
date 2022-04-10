
import {NavLink } from 'react-router-dom';
const NavBar = () => {
  


 // className={`nav-link ${location.pathname ==='/login' ? "active" : ""}`}

  return <div>

<nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
    <div id='myDIV' className="container-fluid containerr2"  >
       <ul className="navbar-nav">
          <li className="nav-item" >
            <NavLink className='nav-link'  to={"/"}>Home</NavLink>
          </li>
          <li className="nav-item">
      	    <NavLink className='nav-link'  to={"/register"}>Registre</NavLink>
          </li>
          <li className="nav-item">
             <NavLink className='nav-link' to={"/login"}>Login</NavLink>
          </li>
       </ul>
       
    </div>
    </nav>

  </div>;
};

export default NavBar;
