import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "../Login/style.css";

function Signup() {
    let [customerData, setCustomerData] = useState({
        customer_first_name: "",
        customer_last_name: "",
        customer_email: "",
        customer_password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleInput = (e) => {
        let newData = {...customerData, [e.target.name]: e.target.value}
        setCustomerData(newData)
    }

    useEffect(() => {
        console.log(customerData, "This is setted customer data")
    }, [customerData])

    return (
        <div className="h-100 w-75 mx-auto align-content-center">            
            <form onSubmit={handleSubmit} className="p-3 bg-light row">
                <h2 className="text-center mb-3">Sign Up</h2>
                <div className="col-6 mb-3">
                    <div className="form-floating">
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            onChange={handleInput} 
                            id="customer_first_name"
                            name="customer_first_name"
                            className="form-control"
                        />
                        <label 
                            htmlFor="customer_first_name" 
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
                            id="customer_last_name"
                            name="customer_last_name"
                            className="form-control"
                        />
                        <label 
                            htmlFor="customer_last_name" 
                            className="floating-label"
                            >Last Name</label>
                    </div>                    
                </div>
                <div className="col-12 mb-3">
                    <div className="form-floating">
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            onChange={handleInput} 
                            id="customer_email"
                            name="customer_email"
                            className="form-control"
                        />
                        <label 
                            htmlFor="customer_email" 
                            className="floating-label"
                            >Email</label>
                    </div>                    
                </div>
                <div className="col-12 mb-3">
                    <div className="form-floating">
                        <input 
                            type="password" 
                            placeholder="Your Password" 
                            onChange={handleInput} 
                            id="customer_password"
                            name="customer_password"
                            className="form-control"
                        />
                        <label 
                            htmlFor="customer_password" 
                            className="floating-label"
                            >Password</label>
                    </div>
                </div>
                <div className="col-12 text-center">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        >Register</button>
                </div>
            </form>
        </div>     
    )
}

export default Signup;