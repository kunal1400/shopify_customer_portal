import React from "react";
import { useParams } from "react-router-dom";
import { Sidebar, DefaultSidebarItems, ItemsUploadedSidebarItems } from "./Sidebars";
import { Orders } from "./Orders";
import { EditProfile } from "./EditProfile"
import { ContactInfoForm } from "./ContactInfo";
import { PasswordUpdate } from "./PasswordUpdate";
import { AllItems } from "../Items/AllItems";
import { ItemUpload } from "../Items/AddItem/AddItem";
import { CUSTOMER } from "./API";
import { getCustomerToken } from "../utils";
import { useQuery } from "@apollo/client";

export default function SectionWithSidebar(props) {
    let { section } = useParams();
    let customerToken = getCustomerToken();

    // Getting customer data
    const { loading, error, data } = useQuery( CUSTOMER, {variables: {input: customerToken}} );

    return <div className="container" id="customer-section">
        <div className="row">
            <div className="col-sm-3">
                {section === 'items-uploaded' || section === 'all-items' ? <Sidebar items={ItemsUploadedSidebarItems} /> : <Sidebar items={DefaultSidebarItems} />}
            </div>
            <div className="col-sm-9">
                {loading ? <div>Loading....</div> : <ComponentBySection section={section} data={data.customer} />}
            </div>
        </div>
    </div>
}

export function ComponentBySection({section, data}) {
    return <>
        {section === 'items-uploaded' ? <ItemUpload customer={data} /> : ''}
        {section === 'order-history' ? <Orders customer={data} /> : ''}
        {section === 'all-items' ? <AllItems customer={data} /> : ''}
        {section === 'profile-info' ? <EditProfile customer={data} /> : ''}
        {section === 'contact-info' ? <ContactInfoForm customer={data} /> : ''}
        {section === 'password' ? <PasswordUpdate customer={data} /> : ''}
    </>
}