import { gql, useMutation } from "@apollo/client";

// Define mutation
export const GET_CUSTOMER_ACCESS_TOKEN = gql`
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }  
`;
