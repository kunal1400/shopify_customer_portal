import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = ({ items }) => {
    const liItems = items.map((d, i) => <li key={i}><Link to={d.link}>{d.label}</Link></li>)
    return <ul className="list-unstyled">{liItems}</ul>
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