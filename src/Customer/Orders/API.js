const { gql } = require("@apollo/client");

export const CUSTOMER_ORDERS = gql`
    query getCustomerOrders($input: String!) {
        customer(customerAccessToken: $input) {
            id
            orders(first: 3) {
                edges {
                    node {
                        orderNumber
                    }
                }
            }
        }
    }
`