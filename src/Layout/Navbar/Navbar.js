import "./style.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useLocation } from 'react-router-dom';
import e from "cors";


export default function Navbar() {
  const {userLogin, setUserLogin}=useContext(UserContext)
const navigate=useNavigate();

const usePathname = () => {
  const location  = useLocation();
  return location.pathname;
}
function logOut()
{
setUserLogin('');
navigate('/');
}



  return (
    <div >
      <ul className={`header gradientLine` }>
       
       <li className="flex-1">
          <NavLink className="navbarLink" to="/" onClick={()=> e.preventDefault()}>
            homePage
            
          </NavLink>
         
        </li>
        {userLogin?.permission === "admin" ?      
        <li className="flex-1">
          {<NavLink className="navbarLink" to="/admin">
            admin
          </NavLink>}
        </li>: ''}  
      
        {!userLogin? <li className="flex-1" >
          <NavLink className="navbarLink" to="/userpage">
            sign up
          </NavLink>
        </li>:''}
       <li className="flex-2" >      {userLogin?._id?<button className="logoutbutto " onClick={logOut}>{`Log out >>`}</button>:''}
</li>
      
       
       
      </ul>
    </div>
  );
}
