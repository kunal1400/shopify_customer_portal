import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
    mutation createCustomer($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
            customer {
                id
            }
            customerUserErrors{
                code
                field
                message
            }
        }
    }
`;