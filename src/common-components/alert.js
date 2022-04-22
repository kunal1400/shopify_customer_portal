import React, {useEffect, useState} from 'react';

export const AlertMsg = (props) => {
    return <div className="alert alert-danger">{props.children}</div>
}

export const SuccessMsg = (props) => {
    return <div className="alert alert-success">{props.children}</div>
}

/**
 * This global function will show graphql error
 * @param {*} param0 
 */
export function HandleApolloClientErrors({ loading, errorsFromResponse, successMsg}) {    
    // state for error handling
    let [errorMsg, setErrorMsg] = useState(false);

    // state for error handling
    let [customSuccessMsg, setCustomSuccessMsg] = useState(false);

    useEffect(() => {
        // If errorsFromResponse is array then it is definitely after API response
        if ( errorsFromResponse instanceof Array && errorsFromResponse.length > 0 ) {
            let errorMessages = errorsFromResponse.map(d => d.message);
            if (errorMessages.length > 0) {
                // Errors setted
                setErrorMsg(errorMessages.join("\n"))
            } else {
                setCustomSuccessMsg(successMsg)
            }
        } else {
            setCustomSuccessMsg(false)
            setErrorMsg(false)
        }
    }, [errorsFromResponse, successMsg])

    if(loading) {
        return <div>Loading...</div>
    }
    if(errorMsg) {
        return <AlertMsg>{errorMsg}</AlertMsg>
    }
    else if(customSuccessMsg) {
        return <SuccessMsg>{customSuccessMsg}</SuccessMsg>
    }
    else {
        return "";
    }
}