import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER } from "./API";
import { HandleApolloClientErrors } from "../common-components/alert";
import { FormLogo } from "../common-components/logos";
import { Link } from "react-router-dom";
import "../Login/style.css";

export function Signup({cssClasses}) {
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

    let [createCustomer, { loading, data, error }] = useMutation(CREATE_CUSTOMER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Calling Create Customer API
            const responseData = await createCustomer({ variables: { input: customerData } })

            // Extracting the API response data
            let { customer, customerUserErrors } = responseData.data.customerCreate;
            setErrorMsg(customerUserErrors);
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
                    >Phone Number</label>
                </div>
                <small>Format+16135551111</small>
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
                successMsg="Customer successfully signup" 
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