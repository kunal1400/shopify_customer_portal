import Cookies from 'universal-cookie';
const cookies = new Cookies();

/**
 * This will save the token in cookies
 */
export const saveCustomerToken = (customerAccessToken) => {
    var date = new Date(customerAccessToken.expiresAt);

    // Setting user access token in cookie with expiration date in UTC
    cookies.set("_shopify_current_user_access_token", customerAccessToken.accessToken, {
        path: '/',
        expires: new Date(customerAccessToken.expiresAt)
    })
}

/**
 * This will return the token from cookies
 */
export const getCustomerToken = () => {
    return cookies.get("_shopify_current_user_access_token");
}

/**
 * This will return the token from cookies
 */
export const removeCustomerToken = () => {
    return cookies.remove("_shopify_current_user_access_token", {
        path: '/'
    });
}