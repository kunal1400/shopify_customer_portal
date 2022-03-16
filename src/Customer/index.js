import React from "react";
import { useParams } from "react-router-dom";
import { DefaultSidebar } from "./Sidebars";

export default function SectionWithSidebar(props) {
    let { section } = useParams();

    // Default sidebar items to show
    let sidebarItems = [
        { label: 'Profile Info', link: "/customer/profile-info" },
        { label: 'Contact Info', link: "/customer/contact-info" },
        { label: 'Password', link: "/customer/password" },
        { label: 'Advanced Settings', link: "/customer/advanced-settings" },
        { label: 'Billing Info', link: "/customer/billing-info" },
        { label: 'Order History', link: "/customer/order-history" }
    ];

    if (section == 'items-uploaded') {
        sidebarItems = [
            { label: 'Items Uploaded', link: "/customer/items-uploaded" },
            { label: 'All Items', link: "/customer/all-items" }
        ]
    }
    console.log(section, sidebarItems, "props")

    return <div className="container">
        <div className="row">
            <div className="col-sm-4">
                <DefaultSidebar items={sidebarItems} />
            </div>
            <div className="col-sm-8">Component</div>
        </div>
    </div>
}