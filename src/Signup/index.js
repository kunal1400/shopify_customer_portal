import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import { CREATE_CUSTOMER } from "./API";
import { HandleApolloClientErrors } from "../common-components/alert";
import { FormLogo } from "../common-components/logos";
import 'react-phone-number-input/style.css';
import "../Login/style.css";

export function Signup({cssClasses}) {
    // State for form data
    let [customerData, setCustomerData] = useState({
        acceptsMarketing: false,        
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    let [errorMsg, setErrorMsg] = useState(false);

    let [phoneNumber, setPhoneNumber] = useState();

    let [customerSuccessMsg, setCustomerSuccessMsg] = useState(false);

    let [createCustomer, { loading, data, error }] = useMutation(CREATE_CUSTOMER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!customerData.firstName) {
            setErrorMsg([{message: "First Name is required"}]);
            return;
        }
        if(!customerData.lastName) {
            setErrorMsg([{message: "Last Name is required"}]);
            return;
        }
        if(!customerData.email) {
            setErrorMsg([{message: "Email is required"}]);
            return;
        }
        if(!phoneNumber) {
            setErrorMsg([{message: "Phone Number is required"}]);
            return;
        }

        // Calling Create Customer API after Password validation
        if(!customerData.password) {
            setErrorMsg([{message: "Password is required"}]);
            return;
        }
        else if(customerData.password.length < 5) {
            setErrorMsg([{message: "Password is too short (minimum is 5 characters)"}]);
        }
        else {
            try {
                // Calling Create Customer API
                const responseData = await createCustomer({ variables: { input: {...customerData, phone: phoneNumber} } })
    
                // Extracting the API response data
                let { customer, customerUserErrors } = responseData.data.customerCreate;
                setErrorMsg(customerUserErrors);
                if(customer) {
                    setCustomerSuccessMsg("Customer Singup successfully you can now login")
                }
            }
            catch (e) {
                console.log(e, "error")
            }
        }        
    }

    const handleInput = (e) => {
        let newData = { ...customerData, [e.target.name]: e.target.value }
        setCustomerData(newData);
        setErrorMsg(false);
    }

    return (
        <form onSubmit={handleSubmit} className={cssClasses}>
            <div className="col-6 mb-3">
                <div className="form-floating">
                    <input
                        type="text"
                        placeholder="First Name"
                        onChange={handleInput}
                        id="firstName"
                        name="firstName"
                        className="form-control"
                    />
                    <label
                        htmlFor="firstName"
                        className="floating-label"
                    >First Name</label>
                </div>
            </div>
            <div className="col-6 mb-3">
                <div className="form-floating">
                    <input
                        type="text"
                        placeholder="Last Name"
                        onChange={handleInput}
                        id="lastName"
                        name="lastName"
                        className="form-control"
                    />
                    <label
                        htmlFor="lastName"
                        className="floating-label"
                    >Last Name</label>
                </div>
            </div>
            <div className="col-6 mb-3">
                <div className="form-floating">
                    <input
                        type="email"
                        placeholder="Your Email"
                        onChange={handleInput}
                        id="email"
                        name="email"
                        className="form-control"
                    />
                    <label
                        htmlFor="email"
                        className="floating-label"
                    >Email</label>
                </div>
            </div>
            <div className="col-6 mb-3">                
                {/* <label htmlFor="phone" className="floating-label">Phone Number</label> */}
                <PhoneInput
                    placeholder="Enter phone number"
                    defaultCountry="US"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                />
            </div>
            <div className="col-12 mb-3">
                <div className="form-floating">
                    <input
                        type="password"
                        placeholder="Your Password"
                        onChange={handleInput}
                        id="password"
                        name="password"
                        className="form-control"
                    />
                    <label
                        htmlFor="password"
                        className="floating-label"
                    >Password</label>
                </div>
            </div>
            <HandleApolloClientErrors 
                loading={loading} 
                errorsFromResponse={errorMsg} 
                error={error}
                successMsg={customerSuccessMsg}
            />
            <div className="col-12 text-center">
                <button
                    type="submit"
                    className="btn btn-primary px-5 py-2"
                >Create Your Account</button>

                <p className="text-center signup-text pt-2 m-0">Already have a BigT account ? <Link to="/login" className="signup-link text-primary">Click here</Link>
                </p>
            </div>
        </form>
    )
}

function Index() {
    return (
        <div className="container">
            <FormLogo heading="Create Your BigTT Account" cssClasses="w-50 mx-auto row" />
            <Signup cssClasses="row"/>
        </div>
    )
}

export default Index;