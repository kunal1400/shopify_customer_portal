import React from "react";
import { FormLogo } from "../common-components/logos";

export const EmailSent = ({email}) => {
    return <div className="container">
        <FormLogo cssClasses="w-50 mx-auto row" heading="Email Sent!" />            
        <div className="text-center">Check your inbox for an email from Big Turntables with a password reset link.</div>
    </div>
}