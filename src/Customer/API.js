const { gql } = require("@apollo/client");

export const CUSTOMER = gql`
    query getCustomer($input: String!) {
        customer(customerAccessToken: $input) {
            id
            displayName
            email
            phone
            firstName
            lastName
            phone   
        }
    }
`

/**
 * Getting users metafields.
 * 
 * @param {*} customer_id 
 * @returns 
 */
 export const getUserMetaFields = ( customer_id ) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/get_customer_meta_fields?gql_customer_id=${customer_id}`, {        
        method: "GET"
    })
    .then((res) => {
        return res.json()
    })
}