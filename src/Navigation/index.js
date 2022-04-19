import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeCustomerToken, getCustomerToken } from "../utils";
import SubNavigation from "../SubNavigation";

/**
 * 
 * @returns Navigation
 * 
 * This component is not accepting any props and no state update so it will not update
 */
function Navigation() {
    let isUserLogedIn = getCustomerToken();
    let navigate = useNavigate();

    const logOut = () => {
        removeCustomerToken()
        navigate("/")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container border-bottom border-dark">
                    <Link to="/" className="navbar-brand text-dark">
                        <div className="mb-2"><img src="https://cdn.shopify.com/s/files/1/0600/4503/3700/files/BigTurntables-FinalLogo-Black-small-circle_380x.jpg" className="img-fluid" /></div>
                        {/* <div className="text-bold">BigT Account</div> */}
                    </Link>
                    <button
                        type="button"
                        className="navbar navbar-light navbar-toggler"
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
            {isUserLogedIn ? <SubNavigation /> : ''}
        </>
    )
}

export default Navigation;