import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CUSTOMER_PASSWORD_RESET } from './API';
import { AlertMsg, SuccessMsg } from "../common-components/alert";
import { FormLogo } from "../common-components/logos";

export function ForgotPasswordForm({cssClasses}) {
    // State for form data
    let [customerData, setCustomerData] = useState({        
        email: ""
    });

    // state for error handling
    let [errorMsg, setErrorMsg] = useState(false);

    // state for error handling
    let [successMsg, setsuccessMsg] = useState(false);

    let [passwordReset, { loading, data, error }] = useMutation(CUSTOMER_PASSWORD_RESET);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Calling Create Customer API
            const responseData = await passwordReset({ variables: customerData })

            // Extracting the API response data
            let { customerUserErrors } = responseData.data.customerRecover;

            // Catching all errors and showing it in UI
            if ( customerUserErrors instanceof Array && customerUserErrors.length > 0 ) {
                let errorMessages = customerUserErrors.map(d => d.message);
                if (errorMessages.length > 0) {
                    // Errors setted
                    setErrorMsg(errorMessages.join("\n"))
                }
            }
            else {
                setsuccessMsg("Password reset link sent on your email, please check!!")
            }
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
            <div className="col-12 mb-3">
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
            {errorMsg ? <AlertMsg>{errorMsg}</AlertMsg> : ''}
            {successMsg ? <SuccessMsg>{successMsg}</SuccessMsg> : ''}
            <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary px-5 py-2">Submit</button>
            </div>
        </form>
    )
}

function Index() {
    return (
        <div className="container">
            <FormLogo cssClasses="w-50 mx-auto row" />
            <ForgotPasswordForm cssClasses="w-50 mx-auto row"/>
        </div>
    )
}

export default Index;