import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import fileinput from 'bootstrap-fileinput';
import 'bootstrap-fileinput/css/fileinput.min.css';

export const BootstrapFileUpload = (props) => {

    let fileInput = useRef();
    var [s3ServerUrls, setS3ServerUrls] = useState([]);

    // componentDidMount 
    useEffect(() => {
        console.log("Component did Mount effect", $(fileInput.current));
        $(fileInput.current).fileinput({
            uploadUrl: "https://shrouded-cove-02566.herokuapp.com/proxy/tools/custom_api/upload_file",
            uploadAsync: true,
            minFileCount: 1,
            maxFileCount: 72,
            overwriteInitial: false,
            initialPreviewAsData: true,
            uploadExtraData: function (previewId, index) {
                return {
                    _uploading_started_at: new Date().toUTCString().replace(/,/g, '').replace(/ /g, "_")
                }
            },
        }).on('fileloaded', function (event, file, previewId, fileId, index, reader) {
            console.log("file loaded")
        }).on('fileclear', function (event) {
            console.log("file cleared")
        }).on('filesorted', function (e, params) {
            console.log('file sorted', e, params);
        }).on('fileuploaded', function (event, data, previewId, index, fileId) {
            console.log('File Uploaded', data, previewId, index, fileId);
            let { response } = data;
            if (response.status == true) {
                console.log(response.data.Location, "Save this url")
                s3ServerUrls.push(response.data.Location)
                setS3ServerUrls(s3ServerUrls)
            }
            else {
                alert("Response is not true")
            }
        }).on('fileuploaderror', function (event, data, msg) {
            console.log('File Upload Error', 'ID: ' + data.fileId + ', Thumb ID: ' + data.previewId);
        }).on('filebatchuploadcomplete', function (event, preview, config, tags, extraData) {
            console.log('File Batch Uploaded', event, preview, config, tags, extraData);
            //             if (s3ServerUrls.length > 0) {
            //                 // Generating the form data
            //                 cfu_add_to_cart({
            //                     items: [{
            //                         quantity: 1,
            //                         id: {{ choosenProduct.variants[0].id }},
            //                     properties: {
            //                     user_uploaded_files: s3ServerUrls.join(",")
            //                 }
            //                     }]
            //         })
            //             .then(response => {
            //                 console.log("added to cart", response);
            //                 jQuery("#{{ block.id }}-success").text("Added to cart");
            //             })
            //             .catch((error) => {
            //                 console.error('Error:', error);
            //             })
            //     }
            //             else {
            //     alert("No url to add to cart")
            // }
        }).on('filebatchuploadsuccess', function (event, data) {
            console.log('File Batch Upload Success', event, data);
        })

    }, [])

    return <div>
        <input type="file" multiple name="customers_uploaded_files[]" className='fileInput' ref={fileInput} />
    </div>
}