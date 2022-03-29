const s3 = require('../middleware/s3');

const upload_file = async (file, folderName) => {
    try {
        return await s3.uploadFile(file, folderName);
    } catch (err) {
        return err;
    }
}

const getFolderFiles = async (folderName) => {
    try {
        return await s3.listKeys(folderName);
    } catch (err) {
        return err;
    }
}

module.exports = {
    upload_file,
    getFolderFiles
}