const { gql } = require("@apollo/client");

export const CHECKOUT_CUSTOMER_ASSOCIATE = gql`
    mutation checkoutCustomerAssociateV2($checkoutId: ID!, $customerAccessToken: String!) {
        checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
            checkout {
                webUrl
                id              
            }
            checkoutUserErrors {
                code
                field
                message
            }
            customer {
                id
                email
            }
        }
    }
`