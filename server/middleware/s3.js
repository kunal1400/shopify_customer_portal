const AWS = require('aws-sdk')
const fs = require("fs");

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

/**
* This is the s3 object which can be accessed globally
**/
const instance = new AWS.S3({ params: { Bucket: process.env.AWS_BUCKET_NAME } })

/**
* This function will upload a base64 data with its mime time in aws s3 bucket.
*
* If path is passed at imageName like `folder1/folder2/abc.png` then it will create two folders in bucket
*
**/
const uploadBase64 = (baseSixtyFourImage, imageName, contentType) => {
    return new Promise((resolve, reject) => {

        // Creating a buffer from baseSixtyFourImage
        // let buf = new Buffer(baseSixtyFourImage, 'base64')
        // let buf = Buffer.from(baseSixtyFourImage, 'base64')
        let buf = dataUriToBuffer(baseSixtyFourImage)

        // Creating a config objec
        let awsConfig = {
            Key: `${imageName}`,
            ContentType: contentType,
            Body: buf,
            ACL: 'public-read'
        }

        instance.upload(awsConfig, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const listKeys = (keyPrefix) => {
    return new Promise((resolve, reject) => {
        instance.listObjectsV2({ Prefix: `${keyPrefix}/` }, function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

/**
 * This function is not dependent on file mime type and other things.
 * It will globally work with all files that uploaded throught "multipart/form-data"
 *
 * @param { string } file
 * @param {string } folderName
 */
const uploadFile = (file, folderName = "default") => {
    var fileName = file.name;
    // Generating date wise folder structure for better management
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    var photoKey = year + "/" + month + "/" + day + "/" + folderName + "/" + fileName;

    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: photoKey,
            // Body: fs.readFileSync(file.path),
            Body: file.data,
            ACL: 'public-read'
        }
    });

    return upload.promise();
}

module.exports = {
    uploadBase64,
    listKeys,
    uploadFile
}
