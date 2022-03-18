import React from "react";
import { useParams } from "react-router-dom";
import { Sidebar, DefaultSidebarItems, ItemsUploadedSidebarItems } from "./Sidebars";
import { Orders } from "./Orders";
import { ItemUpload } from "../Items/ItemsUploaded/ItemUpload";

export default function SectionWithSidebar(props) {
    let { section } = useParams();

    return <div className="container" id="customer-section">
        <div className="row">
            <div className="col-sm-3">
                {section == 'items-uploaded' ? <Sidebar items={ItemsUploadedSidebarItems} /> : <Sidebar items={DefaultSidebarItems} />}
            </div>
            <div className="col-sm-9">
                {section == 'items-uploaded' ? <ItemUpload /> : ''}
                {section == 'order-history' ? <Orders /> : ''}
            </div>
        </div>
    </div>
}