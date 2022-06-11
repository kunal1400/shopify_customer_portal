import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { FormLogo } from "../common-components/logos";
import { HandleApolloClientErrors } from "../common-components/alert";
import { CUSTOMER_ACTIVATE_BY_URL } from "./API";

export default function VerifyAccount({customer}) {
    const navigate = useNavigate();
    const [allParams] = useSearchParams();
    const resetUrl = allParams.get("reset_url");

    // If reset Url is not present in query string then navigate it back to home page
    useEffect(()=> {
        if(!resetUrl) {
            navigate("/");
        }
    }, [])    

    // Setting the default form data
    let [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    // state for error handling
    let [errorMsg, setErrorMsg] = useState(false);
    
    let [customerSuccessMsg, setCustomerSuccessMsg] = useState(false);

    let [activateCustomer, { loading, data, error }] = useMutation(CUSTOMER_ACTIVATE_BY_URL);    

    const handleInput = (e) => {
        setErrorMsg(false);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.password.length >= 5) {
            if(formData.password === formData.confirmPassword) {                
                try {
                    // Calling Create Customer API
                    const responseData = await activateCustomer({ 
                        variables: { 
                            password: formData.password, 
                            resetUrl 
                        }
                    })

                    // Extracting the API response data
                    let { customer, customerUserErrors } = responseData.data.customerActivateByUrl;
                    setErrorMsg(customerUserErrors);
                    if(customer) {
                        setCustomerSuccessMsg("Your account has been successfully verified.");
                        navigate("/");
                    }
                }
                catch (e) {
                    console.log(e, "error")
                }
            } 
            else {
                setErrorMsg([{message: "Password Not Matched"}])
            }            
        }
        else {
            setErrorMsg([{message: "Password should be greater than 5"}])                
        }        
    }

    return <div className="container">
        <div className="row">
            <form className="p-3 w-50 mx-auto">
                <FormLogo heading="Verify Account" />
                <HandleApolloClientErrors 
                    loading={loading} 
                    errorsFromResponse={errorMsg} 
                    error={error}
                    successMsg={customerSuccessMsg}
                />
                <div className="form-group mb-2">
                    <label>Choose Password:</label>
                    <input name="password" required type="password" onChange={handleInput} className="form-control" defaultValue={formData.password} />
                </div>
                <div className="form-group mb-2">
                    <label>Re-enter Password:</label>
                    <input name="confirmPassword" required type="password" onChange={handleInput} className="form-control" defaultValue={formData.confirmPassword} />
                </div>
                <div className="col-12 text-center">
                    <button onClick={handleSubmit} type="button" className="btn btn-primary px-5 py-2">Reset Password</button>
                </div>
            </form>
        </div>        
    </div>
}