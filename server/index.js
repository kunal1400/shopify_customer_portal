require('dotenv').config({path: '../.env'})
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const emailVerify = require('./middleware/emailVerify')
const port = process.env.BACKEND_PORT

// Custom Routes
const s3 = require('./routes/upload_file');

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

// CORS Management
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Handling file upload
app.post('/upload_file', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            console.log(req.files, "files from nestjs");
            
            // Calling file upload function
            let s3response = await s3.upload_file(
                req.files["customers_uploaded_files[]"],
                req.body._uploading_started_at
            );

            // Sending response
            res.send({
                status: true,
                initialPreview: [s3response.Location],
                initialPreviewConfig: [],
                append: true,
                data: s3response
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

// Getting files in the folder
app.get('/files', async (req, res) => {
    let { folder } = req.query
    if (!folder) {
        res.send({
            status: false,
            msg: "Folder is required"
        })
    }
    else {
        // Calling file upload function
        let s3response = await s3.getFolderFiles(folder);

        // Sending response
        res.send({
            status: true,
            data: s3response
        });
    }
})

// Handling file Delete
app.post('/delete_file', async (req, res) => {
    try {
        if (!req.query) {
            res.send({msg: "No query"})
        } else {
            const deleteResponse = await s3.deleteFile(req.query.filePath);
            console.log(deleteResponse, "s3")
            res.send({query: req.query})
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

// // Sending account invite to user
// app.post('/send_invite', async (req, res) => {
//     const {customer_id} = req.query;
//     const reqBody = req.body;

//     if(!customer_id) {
//         res.send("customer_id is required");
//         return;
//     }

//     // calling the api
//     const apiUrl = `https://bigturntables.myshopify.com/admin/api/2022-01/customers/${customer_id}/send_invite.json`
//     try {
//         const { data } = await axios.post(apiUrl, reqBody, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Shopify-Access-Token': `${process.env.ADMIN_API_ACCCESS_TOKEN}`
//             }
//         });
//         res.send(data)
//     } catch (error) {
//         console.log(error)
//         res.send(error.message)
//     }    
// })

// Verifying email address
app.post('/send_email_verification', async (req, res) => {    
    const {customer_id, email } = req.body;

    if(!customer_id) {
        res.send("customer_id is required");
        return;
    }

    if(!email) {
        res.send("email is required");
        return;
    }

    await emailVerify.handleSendEmailVerification(customer_id, email);

    res.send({inputData: req.body});
})


// Verifying email address
app.get('/verify', async (req, res) => {    
    const {customer_id, code } = req.query;

    if(!customer_id) {
        res.send("customer_id is required");
        return;
    }

    if(!code) {
        res.send("code is required");
        return;
    }

    const verificationResponse = await emailVerify.handleVerifyEmail(customer_id, code);
    if(verificationResponse && verificationResponse.status == true) {
        res.redirect(`${process.env.REACT_APP_FRONTEND_URL}?error=email_verified`)
    } else {
        res.redirect(`${process.env.REACT_APP_FRONTEND_URL}?error=email_not_verified`)
    }
})


// Getting user meta field
app.get('/get_customer_meta_fields', async (req, res) => {    
    const { gql_customer_id } = req.query;

    if( !gql_customer_id ) {
        res.send("gql_customer_id is required");
        return;
    }

    const verificationResponse = await emailVerify.handleGetMetFields(gql_customer_id);
    res.send({status: true, metafields: verificationResponse});
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})