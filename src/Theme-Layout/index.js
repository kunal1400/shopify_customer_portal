import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "../Navigation";
import Login from "../Login";
import Home from "../Home";
import Signup from "../Signup";

function Layout() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Layout;