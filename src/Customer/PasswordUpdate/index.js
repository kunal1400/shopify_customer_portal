import React from "react";

export function PasswordUpdate() {
    return <div>        
        <form>
            <h2>Change Password</h2>
            <div className="form-group">
                <label>New password:</label>
                <input type="password" className="form-control" />
            </div>
            <div className="form-group">
                <label>Reenter new password:</label>
                <input type="password" className="form-control" />
            </div>            
        </form>        
    </div>
}