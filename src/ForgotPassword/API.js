import { gql } from "@apollo/client";

// Define mutation
export const CUSTOMER_PASSWORD_RESET = gql`
    mutation customerRecover($email: String!) {
        customerRecover(email: $email) {            
            customerUserErrors {
                code
                field
                message
            }
        }
    }  
`;
