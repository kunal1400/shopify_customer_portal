import React, { useState } from "react";
import { AlertMsg, SuccessMsg } from "../../common-components/alert";
import { useMutation } from "@apollo/client";
import { CUSTOMER_UPDATE } from "../EditProfile/API";
import { getCustomerToken, removeCustomerToken } from "../../utils";

export function PasswordUpdate({customer}) {
    // Setting the default form data
    let [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    // state for error handling
    let [errorMsg, setErrorMsg] = useState(false);

    // state for error handling
    let [successMsg, setsuccessMsg] = useState(false);
    
    let [updateCustomer, { loading, data, error }] = useMutation(CUSTOMER_UPDATE);
    if(data && data.customerUpdate && data.customerUpdate.customerUserErrors)
    console.log(loading, data, error, "update");

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.password === formData.confirmPassword) {
            let customerToken = getCustomerToken();                        
            try {
                // Calling Create Customer API
                const responseData = await updateCustomer({ variables: { customer: {password: formData.password}, customerAccessToken: customerToken } })

                // Extracting the API response data
                let { customerUserErrors } = responseData.data.customerUpdate;

                // Catching all errors and showing it in UI
                if ( customerUserErrors instanceof Array && customerUserErrors.length > 0 ) {
                    let errorMessages = customerUserErrors.map(d => d.message);
                    if (errorMessages.length > 0) {
                        setsuccessMsg(null)
                        setErrorMsg(errorMessages.join("\n"))
                    }
                }
                else {
                    setErrorMsg(null);
                    setsuccessMsg("Password updated Successfully, please login again");
                    removeCustomerToken();
                }
            }
            catch (e) {
                console.log(e, "error")
            }
        } else {
            setsuccessMsg(null)
            setErrorMsg("Password Not Matched")
        }
    }

    return <div>        
        <form>
            <h2>Change Password</h2>
            {errorMsg ? <AlertMsg>{errorMsg}</AlertMsg> : ''}
            {successMsg ? <SuccessMsg>{successMsg}</SuccessMsg> : ''}
            <div className="form-group">
                <label>New password:</label>
                <input name="password" required type="password" onChange={handleInput} className="form-control" defaultValue={formData.password} />
            </div>
            <div className="form-group">
                <label>Re-enter new password:</label>
                <input name="confirmPassword" required type="password" onChange={handleInput} className="form-control" defaultValue={formData.confirmPassword} />
            </div>
            <div className="col-12 text-center">
                <button onClick={handleSubmit} type="button" className="btn btn-primary px-5 py-2">Create Your Account</button>
            </div>
        </form>
    </div>
}