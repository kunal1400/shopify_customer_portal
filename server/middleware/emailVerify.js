const axios = require('axios').default;
const sg = require('./sendgrid');


/**
 * This function will generate the data for email verification
 * @param {*} isVerified 
 * @returns 
 */
 const generateFieldForEmailVerification = (isVerified) => {
    return {
        key: "is_verified",
        value: isVerified,
        type: "boolean",
        namespace: "global"
    }
}


/**
 * This function will generate the data for email verification
 * @param {*} isVerified 
 * @returns 
 */
 const generateFieldForVerificationCode = (code) => {
    return {
        key: "email_verification_code",
        value: code,
        type: "number_integer",
        namespace: "global"
    }
}


/**
 * This will extract the customer id from encoded base gql id
 * 
 * @param {*} customer_gql_id 
 * @returns 
 */
const getCustomerId = ( customer_gql_id ) => {    
    var userGqlId = Buffer.from(customer_gql_id, 'base64').toString();
    var userSplitedInfo = userGqlId.split("/");
    return userSplitedInfo[userSplitedInfo.length - 1];
}


/**
 * This function will update the "isVerified" metafield of customer
 * @param {*} id 
 * @param {*} isVerified 
 * {
        key: string,
        value: any, // Depends upon type
        type: "boolean", // https://shopify.dev/apps/metafields/types
        namespace: "global"
    }
 * @returns 
 */
const setCustomerMetaField = async (id, metafield) => {
    const apiUrl = `https://bigturntables.myshopify.com/admin/api/2022-07/customers/${id}/metafields.json`
    try {        
        const {data} = await axios.post( apiUrl, { metafield }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': `${process.env.ADMIN_API_ACCCESS_TOKEN}`
                }
            }
        );        
        return data;
    } 
    catch (error) {
        return error.message
    }
}


/**
 * This function will update the "isVerified" metafield of customer
 * @param {*} id 
 * @param {*} isVerified 
 * {
        key: string,
        value: any, // Depends upon type
        type: "boolean", // https://shopify.dev/apps/metafields/types
        namespace: "global"
    }
 * @returns 
 */
const getCustomerMetaField = async ( id ) => {
    const apiUrl = `https://bigturntables.myshopify.com/admin/api/2022-07/customers/${id}/metafields.json`
    try {        
        const { data } = await axios.get( apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': `${process.env.ADMIN_API_ACCCESS_TOKEN}`
                }
            }
        );
        return data;
    } 
    catch (error) {
        return error.message
    }
}

/**
 * This is the main function handling the route.
 * 
 * @param {*} customer_gql_id 
 * @returns 
 */
const handleSendEmailVerification = async ( customer_gql_id, customerEmail ) => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const customerId = getCustomerId(customer_gql_id);

    // #1 - Sending email to customer
    const sentEmailResponse = await sg.sendEmailVerificationMail(customerEmail, customerId, randomNumber);

    // #2 - Saving generated code in user metafield
    const isCodeSet = await setCustomerMetaField(
        customerId, 
        generateFieldForVerificationCode(randomNumber)
    );

    // #3 - Setting verification flag in user metafield
    const isFlagSet = await setCustomerMetaField(
        customerId, 
        generateFieldForEmailVerification(false)
    );

    return {customerId, sentEmailResponse, isCodeSet, isVerified: isFlagSet};
}


/**
 * This is the main function handling the route.
 * 
 * @param {*} customer_gql_id 
 * @returns 
 */
 const handleVerifyEmail = async ( customer_id, code ) => {
    // #1 - Getting all meta fields of the user
    const { metafields } = await getCustomerMetaField( customer_id );

    // #2 - If userMetaFields is instance of array
    let metaField = null;
    if( metafields instanceof Array ) {
        for(let i = 0; i < metafields.length; i++ ) {
            if( metafields[i].key === "email_verification_code" ) {
                metaField = metafields[i];
                break;
            }
        }
    }

    // #3 - Checking if code matched or not
    if( code == metaField.value ) {
        // #4 - Setting verification flag to true in user metafield
        const isFlagSet = await setCustomerMetaField( customer_id, generateFieldForEmailVerification(true) );
        return {status: true, message: "code matched", isFlagSet}
    } 
    else {
        return {status: false, message: "code not matched"}
    }
}


/**
 * This is the main function handling the route.
 * 
 * @param {*} customer_gql_id 
 * @returns 
 */
 const handleGetMetFields = async ( customer_gql_id ) => {
    // #1 - Getting all meta fields of the user
    const customerId = getCustomerId(customer_gql_id);
    const { metafields } = await getCustomerMetaField( customerId );
    return metafields;
}


module.exports = {
    handleSendEmailVerification,
    handleVerifyEmail,
    handleGetMetFields
}