import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "../Navigation";
import Login from "../Login";
import Home from "../Home";
import Signup from "../Signup";
import SectionWithSidebar from "../Customer";
import { EditItem } from "../Items/EditItem";
import Footer from "../Footer";

function Layout() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route path="/customer/:section" element={<SectionWithSidebar />} />
                <Route path="/edit-item" element={<EditItem />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Layout;