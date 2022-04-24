import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CUSTOMER_PASSWORD_RESET } from './API';
import { HandleApolloClientErrors } from "../common-components/alert";
import { FormLogo } from "../common-components/logos";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordForm({cssClasses}) {
    let navigate = useNavigate();

    // State for form data
    let [customerData, setCustomerData] = useState({        
        email: ""
    });

    // Set apollo Errors
    let [responseErrors, setResponseErrors] = useState(false);

    // Show email sent message
    let [emailSentMessage, setEmailSentMessage] = useState(false);

    let [passwordReset, { loading, data, error }] = useMutation(CUSTOMER_PASSWORD_RESET);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Calling Create Customer API
            const responseData = await passwordReset({ variables: customerData })

            // Extracting the API response data
            let { customerUserErrors } = responseData.data.customerRecover;
            if(customerUserErrors.length === 0) {
                navigate("/forgot-password-link-sent");
            } else {
                setResponseErrors(customerUserErrors);
            }            
        }
        catch (e) {
            console.log(e, "error")
        }
    }

    const handleInput = (e) => {
        let newData = { ...customerData, [e.target.name]: e.target.value }
        setCustomerData(newData);
        setResponseErrors(false);
    }

    return (
        <form onSubmit={handleSubmit} className={cssClasses}>
            <div className="text-center mb-3">Enter your email address and we'll send you a link to reset your password.</div>
            <div className="col-12 mb-3">
                <div className="form-floating">
                    <input
                        type="email"
                        placeholder="Your Email"
                        onChange={handleInput}
                        id="email"
                        name="email"
                        className="form-control"
                        required="required"
                    />
                    <label
                        htmlFor="email"
                        className="floating-label"
                    >Email</label>
                </div>
            </div>
            <HandleApolloClientErrors 
                loading={loading} 
                errorsFromResponse={responseErrors} 
                successMsg="Password reset link sent on your email, please check!!" 
            />            
            <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary px-5 py-2">Submit</button>
            </div>
        </form>
    )
}

function Index() {
    return (
        <div className="container">
            <FormLogo cssClasses="w-50 mx-auto row" heading="Forgot Your Password?" />            
            <ForgotPasswordForm cssClasses="w-50 mx-auto row"/>
        </div>
    )
}

export default Index;