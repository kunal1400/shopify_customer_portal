import { gql } from "@apollo/client";

// Define mutation
export const CUSTOMER_ACTIVATE_BY_URL = gql`
    mutation customerActivateByUrl($resetUrl: URL!, $password: String!) {
        customerActivateByUrl(activationUrl: $resetUrl, password: $password) {
            customer { id }
            customerUserErrors { code field message}
        }
    } 
`;
