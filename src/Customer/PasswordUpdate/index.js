import React from "react";

export function PasswordUpdate({customer}) {
    // Setting the default form data
    let [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    return <div>        
        <form>
            <h2>Change Password</h2>
            <div className="form-group">
                <label>New password:</label>
                <input type="password" className="form-control" defaultValue={formData.password} />
            </div>
            <div className="form-group">
                <label>Re-enter new password:</label>
                <input type="password" className="form-control" defaultValue={formData.confirmPassword} />
            </div>            
        </form>        
    </div>
}