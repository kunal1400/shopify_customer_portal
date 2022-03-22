require('dotenv').config()
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})