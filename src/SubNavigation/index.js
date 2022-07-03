import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertMsg } from "../common-components/alert";
import { CUSTOMER, getUserMetaFields } from "../Customer/API";
import { DefaultSidebarItems, ItemsUploadedSidebarItems } from "../Customer/Sidebars";
import { sendAccountInvite } from "../Signup/API";
import { getCustomerToken } from "../utils";

function SubNavigation() {
    const location = useLocation();
    const [isVerified, setIsVerified] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    
    let customerToken = getCustomerToken();    
    
    // Getting customer data
    const { loading, error, data } = useQuery( CUSTOMER, {variables: {input: customerToken}} );
    if( data && !currentUser ) {
        setCurrentUser(data.customer)
    }
    
    // Calling APIs on component render
    useState(() => {
        if( !loading && data && data.customer.id ) {        
            // Setting isVerified flag in state
            getUserMetaFields(data.customer.id)
            .then((userMetaFields) => {                
                if( userMetaFields && userMetaFields.metafields.length > 0 ) {
                    setIsVerified(false);
                } else {
                    setIsVerified(false);
                }
            })
            .catch((e) => {
                console.log(e)
            })
        }            
    }, [currentUser])

    const resendVerificationEmail = () => {
        if(currentUser) {
            sendAccountInvite({
                id: currentUser.id, 
                email: currentUser.email
            })
        }
    }

    const orderHistoryItems = DefaultSidebarItems.map(d => d.link);
    const itemUploadedSidebar = ItemsUploadedSidebarItems.map(d => d.link);
    
    return <div className="container">
        
        {!isVerified ? <AlertMsg>Please verify your account, <a onClick={resendVerificationEmail}>click here to resend verification email</a></AlertMsg>: ''}

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