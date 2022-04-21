const { gql } = require("@apollo/client");

export const CUSTOMER_UPDATE = gql`
    mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
        customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
            customer {
                id
                displayName
                email
                phone
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
`