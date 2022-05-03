import { gql } from "@apollo/client";

// Define mutation
export const RESET_PASSWORD = gql`
    mutation resetPasswordByUrl($resetUrl: URL!, $password: String!) {
        customerResetByUrl(resetUrl: $resetUrl, password: $password) {
            customer { id }
            customerUserErrors { code field message}
        }
    } 
`;
