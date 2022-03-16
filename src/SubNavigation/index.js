import React from "react";
import { Link } from "react-router-dom";

function SubNavigation() {
    return <div className="container">
        <div className="row">
            <ul className="nav mb-3">
                <Link to="/customer/items-uploaded" className="nav-link">Items Uploaded</Link>
                <Link to="/customer/order-history" className="nav-link">Order History</Link>
                <Link to="/customer/notification" className="nav-link">Notifications</Link>
            </ul>
        </div>
    </div>
}

export default SubNavigation;