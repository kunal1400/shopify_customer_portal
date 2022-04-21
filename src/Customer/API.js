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