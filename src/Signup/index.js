import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER } from "./API";
import { AlertMsg, SuccessMsg } from "../common-components/alert";
import { FormLogo } from "../common-components/logos";
import "../Login/style.css";

function Signup() {
    // State for form data
    let [customerData, setCustomerData] = useState({
        acceptsMarketing: false,
        phone: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    // state for error handling
    let [errorMsg, setErrorMsg] = useState(false);

    // state for error handling
    let [successMsg, setsuccessMsg] = useState(false);

    let [createCustomer, { loading, data, error }] = useMutation(CREATE_CUSTOMER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(customerData, "customerData")
        try {
            // Calling Create Customer API
            const responseData = await createCustomer({ variables: { input: customerData } })

            // Extracting the API response data
            let { customer, customerUserErrors } = responseData.data.customerCreate

            // Catching all errors and showing it in UI
            if (customerUserErrors instanceof Array && customerUserErrors.length > 0) {
                let errorMessages = customerUserErrors.map(d => d.message);
                if (errorMessages.length > 0) {
                    // Errors setted
                    setErrorMsg(errorMessages.join("\n"))
                }
            }
            else if (customer && customer.id) {
                setsuccessMsg("Customer successfully signup")
            }
            console.log(customer, customerUserErrors, errorMsg, "responseData")
        }
        catch (e) {
            console.log(e, "error")
        }
    }

    const handleInput = (e) => {
        let newData = { ...customerData, [e.target.name]: e.target.value }
        setCustomerData(newData);
        setErrorMsg(false);
    }

    // useEffect(() => {
    //     console.log(customerData, "This is setted customer data")
    // }, [customerData])

    return (
        <div className="container">
            <FormLogo />
            <div className="row">
                <form onSubmit={handleSubmit} className="w-50 mx-auto row">
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
                        <div className="form-floating">
                            <input
                                type="phone"
                                placeholder="Your Phone"
                                onChange={handleInput}
                                id="phone"
                                name="phone"
                                className="form-control"
                            />
                            <label
                                htmlFor="phone"
                                className="floating-label"
                            >Phone Number <small>Formatted Format +16135551111</small></label>
                        </div>
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
                    {errorMsg ? <AlertMsg>{errorMsg}</AlertMsg> : ''}
                    {successMsg ? <SuccessMsg>{successMsg}</SuccessMsg> : ''}
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;