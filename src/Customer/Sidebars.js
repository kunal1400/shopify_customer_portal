import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = ({ items }) => {
    const location = useLocation();
    const liItems = items.map((d, i) => <Link 
        key={i} 
        className={location.pathname === d.link ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} 
        to={d.link}
    >{d.label}</Link>)
    return <div className="list-group">{liItems}</div>
}

export const DefaultSidebarItems = [
    { label: 'Profile Info', link: "/customer/profile-info" },
    { label: 'Contact Info', link: "/customer/contact-info" },
    { label: 'Password', link: "/customer/password" },
    // { label: 'Advanced Settings', link: "/customer/advanced-settings" },
    // { label: 'Billing Info', link: "/customer/billing-info" },
    { label: 'Order History', link: "/customer/order-history" }
]

export const ItemsUploadedSidebarItems = [
    { label: 'Upload New Item', link: "/customer/items-uploaded" },
    { label: 'All Items', link: "/customer/all-items" }
]