import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import PhoneInput from 'react-phone-number-input';
import { HandleApolloClientErrors } from "../../common-components/alert";
import { CUSTOMER_UPDATE } from "./API";
import { getCustomerToken } from "../../utils";

export function EditProfile({customer}) {
    let {email, firstName, lastName, phone, displayName } = customer;

    // Setting the default form data
    let [formData, setFormData] = useState({
        usernameDisabled: true,
        emailDisabled: true,
        email, 
        firstName, 
        lastName, 
        displayName        
    })

    let [phoneNumber, setPhoneNumber] = useState(phone);

    let [customerSuccessMsg, setCustomerSuccessMsg] = useState(false);

    let [errorMsg, setErrorMsg] = useState(false);

    let [updateCustomer, { loading, data, error }] = useMutation(CUSTOMER_UPDATE);

    const handleChange = (e) => {
        if(e.target.name && e.target.value) {
            let newFormData = {...formData, [e.target.name]: e.target.value}
            setFormData(newFormData)
        }        
    }    

    const toggleDisplayName = () => {
        setFormData({...formData, usernameDisabled: !formData.usernameDisabled})
    }

    const toggleEmailName = () => {
        setFormData({...formData, emailDisabled: !formData.emailDisabled})
    }

    const submitForm = async () => {
        let customerToken = getCustomerToken();
        let copiedFormData = {...formData}        
        if( copiedFormData.usernameDisabled ) {            
            delete copiedFormData.displayName
        }
        if( copiedFormData.emailDisabled ) {            
            delete copiedFormData.email
        }
        // Deleting unnecessary keys
        delete copiedFormData.emailDisabled
        delete copiedFormData.usernameDisabled

        const responseData = await updateCustomer({ variables: { customer: copiedFormData, customerAccessToken: customerToken } });
        let { customer, customerUserErrors } = responseData.data.customerUpdate;
        setErrorMsg(customerUserErrors);
        if(customer) {
            setCustomerSuccessMsg("Customer updated")
        }
    }

    return <>
        <div className="mb-5">
            <h2 className="mb-3">Account Information</h2>
            {/* <div className="form-group">
                <label>Username</label>
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        defaultValue={formData.displayName} 
                        disabled={formData.usernameDisabled ? true : false }
                        name="displayName"
                        onChange={handleChange}
                    />
                    <div className="input-group-append">
                        <button onClick={toggleDisplayName} className="btn btn-outline-secondary" type="button">Edit</button>
                    </div>
                </div>        
            </div> */}
            <div className="form-group">
                <label>Email <small>(Private)</small></label>
                <div className="input-group">
                    <input 
                        type="email" 
                        className="form-control" 
                        defaultValue={formData.email} 
                        disabled={formData.emailDisabled ? true : false }
                        name="email"
                        onChange={handleChange}
                    />
                    <div className="input-group-append">
                        <button onClick={toggleEmailName} className="btn btn-outline-secondary" type="button">Edit</button>
                    </div>
                </div>            
            </div>
        </div>
        <div className="mb-5">
            <h2 className="mb-2">Profile Information</h2>        
            <div className="form-group mb-2">
                <label>First Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    defaultValue={formData.firstName}
                    name="firstName"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mb-2">
                <label>Last Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    defaultValue={formData.lastName}
                    name="lastName"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mb-2">
                <label>Phone</label>
                {/* <input 
                    type="text" 
                    className="form-control" 
                    defaultValue={formData.phone}
                    name="phone"
                    onChange={handleChange}
                /> */}
                <PhoneInput
                    placeholder="Enter phone number"
                    defaultCountry="US"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                />
            </div>
            <HandleApolloClientErrors 
                loading={loading} 
                errorsFromResponse={errorMsg} 
                error={error}
                successMsg={customerSuccessMsg}
            />
            <div className="form-group">
                <button onClick={submitForm} className="btn btn-primary my-3">Submit</button>
            </div>
        </div>        
    </>
}