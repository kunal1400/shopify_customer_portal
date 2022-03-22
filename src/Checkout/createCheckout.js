const { gql } = require("@apollo/client");

/**
 * Why Do You Need A "First" Or "Last" Field If You're Using Both "Before" And "After"?
 * https://community.shopify.com/c/shopify-apis-and-sdks/why-do-you-need-a-quot-first-quot-or-quot-last-quot-field-if-you/td-p/1372777
 * 
 * This is helpful to get weburl and checkout id
 */
export const CHECKOUT_CREATE = gql`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            checkout {
                id
                webUrl
            }
            checkoutUserErrors {
                code
                field
                message
            }
            queueToken
        }
    }
`