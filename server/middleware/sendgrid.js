const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * This will send email to customer for verification
 * 
 * @param {*} customerId 
 * @param {*} code 
 * @returns 
 */
const sendEmailVerificationMail = async ( customerEmail, customerId, code ) => {
    const msg = {
        to: customerEmail,
        from: `${process.env.SENDGRID_SENDER_EMAIL}`,
        subject: 'Email Verification',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<a href="${process.env.REACT_APP_BACKEND_URL}/verify?customer_id=${customerId}&code=${code}">Click Here To Verify Your Account</a>`,
    };
    try {
        return await sgMail.send(msg);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendEmailVerificationMail
}