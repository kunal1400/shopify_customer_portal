export const AlertMsg = (props) => {
    return <div className="alert alert-danger">{props.children}</div>
}

export const SuccessMsg = (props) => {
    return <div className="alert alert-success">{props.children}</div>
}