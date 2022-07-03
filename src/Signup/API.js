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
export const sendAccountInvite = ( customer_id ) => {
    // const apiUrl = `https://${REACT_APP_STORE_NAME}.myshopify.com/admin/api/2022-01/customers/${customer_id}/send_invite.json`
    // return fetch(apiUrl, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-Shopify-Access-Token': `${process.env.REACT_APP_SECRET_KEY}`
    //     },
    //     method: "POST",
    //     body: JSON.stringify({customer_invite: {}})
    // })

    return fetch(process.env.REACT_APP_BACKEND_URL + '/send_invite?customer_id=' + customer_id, {        
        method: "POST",
        body: {customer_invite: {}}
    })
}