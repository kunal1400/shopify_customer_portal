import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DefaultSidebarItems, ItemsUploadedSidebarItems } from "../Customer/Sidebars";

function SubNavigation() {
    const location = useLocation();
    const orderHistoryItems = DefaultSidebarItems.map(d => d.link);
    const itemUploadedSidebar = ItemsUploadedSidebarItems.map(d => d.link);
    
    return <div className="container">
        <div className="row">
            <ul className="nav nav-pills mb-3">
                <li className="nav-item">
                    <Link 
                        to="/customer/all-items" 
                        className={ itemUploadedSidebar.indexOf(location.pathname) !== -1 ? "nav-link active" : "nav-link"}
                    >Items Uploaded</Link>
                </li>
                <li className="nav-item">
                    <Link 
                        to="/customer/order-history" 
                        className={ orderHistoryItems.indexOf(location.pathname) !== -1 ? "nav-link active" : "nav-link"}
                    >Order History</Link>
                </li>
                {/* <Link to="/customer/notification" className="nav-link">Notifications</Link> */}
            </ul>
        </div>
    </div>
}

export default SubNavigation;