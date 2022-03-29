const { gql } = require("@apollo/client");

export const CUSTOMER_ORDERS = gql`
    query getCustomerorder($input: String!, $ordersToShow: Int!) {
        customer(customerAccessToken: $input) {
            id
            orders(first: $ordersToShow) {
                edges {
                    cursor
                    node{
                        id
                        customerUrl
                        email
                        name                        
                        statusUrl
                        fulfillmentStatus
                        orderNumber
                        processedAt
                        lineItems(first: 10) {
                            edges{
                                node{
                                    title
                                    quantity
                                    variant {
                                        title                  
                                    }
                                    customAttributes{
                                        key
                                        value
                                    }                                    
                                }
                                cursor
                            }
                            pageInfo {
                                hasNextPage
                                hasPreviousPage
                            }
                        }
                    }
                }
                pageInfo{
                    hasNextPage
                    hasPreviousPage
                }
            }
        }
    }
`