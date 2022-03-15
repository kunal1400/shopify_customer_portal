import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { GET_CUSTOMER_ACCESS_TOKEN } from './API';
import { AlertMsg, SuccessMsg } from "../common-components/alert";
import './style.css';

const cookies = new Cookies();

/**
 * 
 * @param {*} props 
 * @returns Creating new Input component so that on form if only email change then only email render and if password change then only password render
 */
function Input({ type, onInput, className, name, value, placeholder }) {
    let [input, setinput] = useState("");

    const handleChange = (e) => {
        let userInputData = { ...input, [e.target.name]: e.target.value }
        setinput(userInputData);
    }

    // Lifting state up on input change
    useEffect(() => {
        onInput(input)
    }, [input])

    return (
        <input
            onChange={handleChange}
            type={type}
            className={className}
            name={name}
            value={value}
            placeholder={placeholder}
        />
    )
}

function Login(props) {
    let [customerData, setCustomerData] = useState({
        customer_email: "",
        customer_password: ""
    });

    let [emailError, setEmailError] = useState(false);
    let [passwordError, setPasswordError] = useState(false);
    // state for error handling
    let [errorMsg, setErrorMsg] = useState(false);

    // state for error handling
    let [successMsg, setsuccessMsg] = useState(false);

    let [getAccessToken, { loading, data, error }] = useMutation(GET_CUSTOMER_ACCESS_TOKEN);

    let navigate = useNavigate();

    const handleInput = (data) => {
        let userInputData = { ...customerData, ...data }
        setCustomerData(userInputData);
        setErrorMsg(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (customerData.customer_email.length > 0) {
            setEmailError(false)
        }
        else {
            setEmailError(true)
        }
        if (customerData.customer_password > 0) {
            setPasswordError(false)
        }
        else {
            setPasswordError(true)
        }

        // If email & password are set then call API
        if (customerData.customer_email.length > 0 && customerData.customer_password > 0) {
            try {
                const response = await getAccessToken({ variables: { input: { email: customerData.customer_email, password: customerData.customer_password } } })

                // Fetching errors and accesstoken from response
                let { customerAccessToken, customerUserErrors } = response.data.customerAccessTokenCreate

                // Catching all errors and showing it in UI
                if (customerUserErrors instanceof Array && customerUserErrors.length > 0) {
                    let errorMessages = customerUserErrors.map(d => d.message);
                    if (errorMessages.length > 0) {
                        // Errors setted
                        setErrorMsg(errorMessages.join("\n"))
                    }
                }
                else if (customerAccessToken) {
                    console.log(customerAccessToken, "Customer successfully login")
                    var date = new Date(customerAccessToken.expiresAt);
                    // Setting user access token in cookie with expiration date in UTC
                    cookies.set("_shopify_current_user_access_token", customerAccessToken.accessToken, {
                        path: '/',
                        expires: new Date(customerAccessToken.expiresAt)
                    })
                    // After login redirect user to home page
                    navigate("/")
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div className="row h-100 w-75 mx-auto align-content-center">
            <form onSubmit={handleSubmit} className="p-3 bg-light">
                <h2 className="mb-3 text-center">Shopify Login Form</h2>
                <div className="col-12 mb-3 form-floating">
                    <Input
                        type="email"
                        onInput={handleInput}
                        className={`form-control ${emailError ? 'is-invalid' : ''}`}
                        name="customer_email"
                        placeholder="Enter your email"
                    />
                    <label
                        htmlFor="customerEmail"
                        className="floating-label"
                    >Email</label>
                </div>
                <div className="col-12 mb-3 form-floating">
                    <Input
                        type="password"
                        onInput={handleInput}
                        className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                        name="customer_password"
                        placeholder="Enter your password"
                    />
                    <label
                        htmlFor="customerPassword"
                        className="floating-label"
                    >Password</label>
                </div>
                {errorMsg ? <AlertMsg>{errorMsg}</AlertMsg> : ''}
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                {loading ? <div className="col-12 text-center text-success mt-3">Loading...</div> : ''}
                {error ? <div className="col-12 text-center text-error mt-3">Submission error! {error.message}</div> : ''}
            </form>
        </div>
    )
}

export default Login;