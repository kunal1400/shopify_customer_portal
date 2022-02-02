import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

let cookie = new Cookies();

/**
 * 
 * @returns Navigation
 * 
 * This component is not accepting any props and no state update so it will not update
 */
function Navigation() {    
    let isUserLogedIn = cookie.get("_shopify_current_user_access_token");
    let navigate = useNavigate();

    const logOut = () => {
        cookie.remove("_shopify_current_user_access_token", { 
            path: '/'
        })
        navigate("/")
    }

    return(
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Shopify Portal</Link>
                <button 
                    type="button" 
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navigation"
                    aria-label="navigation"
                    aria-controls="navigation"
                    aria-expanded="navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navigation">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">Home</Link>                           
                        </li>
                        <li className="nav-item">                            
                            {
                                !isUserLogedIn ? <Link to="/signup" className="nav-link">Sign Up</Link> : ''
                            }
                        </li> 
                        <li className="nav-item">                            
                            {
                                isUserLogedIn ? 
                                    <a href="#" onClick={logOut} className="nav-link">Logout</a> 
                                    : 
                                    <Link to="/login" className="nav-link">Login</Link>
                            }
                        </li>                        
                    </ul>
                </div>
            </div>            
        </nav>
    )
}

export default Navigation;