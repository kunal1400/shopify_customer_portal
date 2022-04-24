import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CUSTOMER_UPDATE } from "../EditProfile/API";
import { getCustomerToken, removeCustomerToken } from "../../utils";
import { HandleApolloClientErrors } from "../../common-components/alert";

export function PasswordUpdate({customer}) {
    let navigate = useNavigate();

    // Setting the default form data
    let [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    // state for error handling
    let [errorMsg, setErrorMsg] = useState(false);
    
    let [customerSuccessMsg, setCustomerSuccessMsg] = useState(false);

    let [updateCustomer, { loading, data, error }] = useMutation(CUSTOMER_UPDATE);    

    const handleInput = (e) => {
        setErrorMsg(false);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.password.length >= 5) {
            if(formData.password === formData.confirmPassword) {
                let customerToken = getCustomerToken();                        
                try {
                    // Calling Create Customer API
                    const responseData = await updateCustomer({ variables: { customer: {password: formData.password}, customerAccessToken: customerToken } })

                    // Extracting the API response data
                    let { customer, customerUserErrors } = responseData.data.customerUpdate;
                    setErrorMsg(customerUserErrors);
                    if(customer) {
                        setCustomerSuccessMsg("Password changed successfully");
                        removeCustomerToken();
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

    return <div>        
        <form>
            <h2>Change Password</h2>
            <HandleApolloClientErrors 
                loading={loading} 
                errorsFromResponse={errorMsg} 
                error={error}
                successMsg={customerSuccessMsg}
            />
            <div className="form-group mb-2">
                <label>New password:</label>
                <input name="password" required type="password" onChange={handleInput} className="form-control" defaultValue={formData.password} />
            </div>
            <div className="form-group mb-2">
                <label>Re-enter new password:</label>
                <input name="confirmPassword" required type="password" onChange={handleInput} className="form-control" defaultValue={formData.confirmPassword} />
            </div>
            <div className="col-12 text-center">
                <button onClick={handleSubmit} type="button" className="btn btn-primary px-5 py-2">Create Your Account</button>
            </div>
        </form>
    </div>
}