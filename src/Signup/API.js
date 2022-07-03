import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
    mutation createCustomer($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
            customer {
                id
                email
                firstName
                lastName
                phone
            }
            customerUserErrors{
                code
                field
                message
            }
        }
    }
`;

/**
 * Sending account invite to signup users.
 * 
 * @param {*} customer_id 
 * @returns 
 */
export const sendAccountInvite = ( customer ) => {
    // console.log(customer, {
    //     customer_id: customer.id,
    //     email: customer.email
    // }, "iiiiiiiiiiiiiiiiiiiiiii")
    return fetch(process.env.REACT_APP_BACKEND_URL + '/send_email_verification', {        
        method: "POST",
        body: JSON.stringify({
            customer_id: customer.id,
            email: customer.email
        })
    })
}