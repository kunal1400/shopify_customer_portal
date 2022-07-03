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
 * This will save the token in cookies
 */
 export const saveCustomer = (customer) => {
    cookies.set("_shopify_current_user", customer, { path: '/' });
}

/**
 * This will return the token from cookies
 */
export const getCustomerToken = () => {
    return cookies.get("_shopify_current_user_access_token");
}

/**
 * This will remove the token from cookies
 */
export const removeCustomerToken = () => {
    return cookies.remove("_shopify_current_user_access_token", {
        path: '/'
    });
}

/**
 * This will return the current time
 */
export const currentTime = new Date().toUTCString().replace(/,/g, '').replace(/ /g, "_").replace(/:/g, "_");

/**
 * This will return the date wise folder path
 */
export const dateWiseFolder = () => {
    // Generating date wise folder structure for better management
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return year + "/" + month + "/" + day;
}
