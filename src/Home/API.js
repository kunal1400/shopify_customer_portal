import { gql } from "@apollo/client";

export const GET_SHOP_INFO = gql`
    query {
        shop {
            description
            primaryDomain {
                url
            }
        }
    }
`