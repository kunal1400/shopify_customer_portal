const { gql } = require("@apollo/client");

export const CHECKOUT_COMPLETE_FREE = gql`
    mutation checkoutCompleteFree($checkoutId: ID!) {
        checkoutCompleteFree(checkoutId: $checkoutId) {
            checkout {
                id
                webUrl
            }
            checkoutUserErrors {
                code
                field
                message
            }
        }
    }
`

