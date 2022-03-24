import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import fileinput from 'bootstrap-fileinput';
import 'bootstrap-fileinput/css/fileinput.min.css';
import PropTypes from 'prop-types';

// Default Time for folder
const uploadStartTime = new Date().toUTCString().replace(/,/g, '').replace(/ /g, "_").replace(/:/g, "_")

// Initial configuration for fileinput plugin
const fileInputConfig = {
    uploadUrl: `${process.env.REACT_APP_BACKEND_URL}/upload_file`,
    uploadAsync: true,
    minFileCount: 1,
    maxFileCount: 72,
    overwriteInitial: false,
    initialPreviewAsData: true,
    showUpload: true,
    uploadExtraData: function (previewId, index) {
        return {
            _uploading_started_at: uploadStartTime
        }
    },
}

const BootstrapFileUpload = ({ filebatchuploadcomplete }) => {
    let fileInput = useRef();
    let [s3ServerUrls, setS3ServerUrls] = useState([]);

    // componentDidMount 
    useEffect(() => {
        $(fileInput.current).fileinput(
            fileInputConfig
        ).on('fileloaded', function (event, file, previewId, fileId, index, reader) {
            // console.log("file loaded")
        }).on('fileclear', function (event) {
            // console.log("file cleared")
        }).on('filesorted', function (e, params) {
            // console.log('file sorted', e, params);
        }).on('fileuploaded', function (event, data, previewId, index, fileId) {
            let { response } = data;
            if (response.status === true) {
                s3ServerUrls.push(response.data.Location)
                setS3ServerUrls(s3ServerUrls)
            }
            else {
                alert("Response is not true")
            }
        }).on('fileuploaderror', function (event, data, msg) {
            // console.log('File Upload Error', 'ID: ' + data.fileId + ', Thumb ID: ' + data.previewId);
        }).on('filebatchuploadcomplete', function (event, files, extra) {
            // console.log('File Batch Uploaded', event, preview, config, tags, extraData);
            filebatchuploadcomplete(extra, s3ServerUrls);
            // try {
            //     const responseData = await createCheckout({
            //         variables: { input: dataForCheckout }
            //     })
            //     let { checkout, checkoutUserErrors } = responseData.data.checkoutCreate;
            //     if (checkoutUserErrors && checkoutUserErrors.length > 0) {
            //         let errorStr = checkoutUserErrors.map(d => d.message).join(", ");
            //         setCreateCheckoutMutationError(errorStr)
            //     } else {
            //         await checkoutAssociateCustomer({
            //             variables: {
            //                 checkoutId: checkout.id,
            //                 customerAccessToken: getCustomerToken()
            //             }
            //         });
            //         console.log(checkout, "checkout")
            //         setTimeout(() => {
            //             alert("Redirecting to payment page")
            //             window.location.href = checkout.webUrl
            //         }, 2000)
            //     }
            // } catch (err) {
            //     console.log(err, "err+err")
            // }
        }).on('filebatchuploadsuccess', function (event, data) {
            // console.log('File Batch Upload Success', event, data);
        })

    }, [])

    return <div>
        <input type="file" multiple name="customers_uploaded_files[]" className='fileInput' ref={fileInput} />
    </div>
}

BootstrapFileUpload.propTypes = {
    filebatchuploadcomplete: PropTypes.func.isRequired
}

export default BootstrapFileUpload;