import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "../Navigation";
import Login from "../Login";
import Home from "../Home";
import Signup from "../Signup";
import ForgotPassword from "../ForgotPassword";
import { EmailSent as ForgotPasswordLinkSent } from "../ForgotPassword/EmailSent";
import SectionWithSidebar from "../Customer";
import { EditItem } from "../Items/EditItem";

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
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/forgot-password-link-sent" element={<ForgotPasswordLinkSent />} />                
            </Routes>
        </BrowserRouter>
    )
}

export default Layout;