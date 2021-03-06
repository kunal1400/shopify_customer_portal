import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import fileinput from 'bootstrap-fileinput';
import 'bootstrap-fileinput/css/fileinput.min.css';

const BootstrapFileUpload = ({ 
    filebatchuploadcomplete, 
    initialPreview, 
    uploadStartTime, 
    filebatchselected, 
    filebeforeload,
    startUpload=false 
}) => {
    let inputFileRef = useRef();    
    let [s3ServerUrls, setS3ServerUrls] = useState([]);
    
    // Initial configuration for fileinput plugin
    const fileInputConfig = {
        uploadUrl: `${process.env.REACT_APP_BACKEND_URL}/upload_file`,
        showClose: false,
        uploadAsync: true,
        minFileCount: 1,
        // maxFileCount: 72,
        maxTotalFileCount: 72,
        overwriteInitial: false,
        initialPreviewAsData: true,
        initialPreviewCount: true,
        showUpload: true,
        fileActionSettings: {
            showUpload: false,
            showDownload: false,
            showZoom: false,
            showDrag: false
        },        
        // deleteUrl: '/localhost/avatar/delete',
        uploadExtraData: function (previewId, index) {
            return {
                _uploading_started_at: uploadStartTime
            }
        },
    }

    const setInitialPreview = () => {
        $(inputFileRef.current).fileinput('destroy').fileinput(fileInputConfig);
    }

    // Initial Preview
    if(initialPreview instanceof Array && initialPreview.length > 0) {
        fileInputConfig.showPreview = true;        
        fileInputConfig.initialPreview = initialPreview.map((item, index) => `${process.env.REACT_APP_BUCKET_URL}/${item.Key}`);
        fileInputConfig.initialPreviewConfig = initialPreview.map((item, index) => {
            return {
                caption: item.ETag,
                key: item.Key,
                url: `${process.env.REACT_APP_BACKEND_URL}/delete_file?filePath=${item.Key}`
            }
        });
        
        // Setting initial preview
        setInitialPreview()
    }

    useEffect(() => {
        if( startUpload && startUpload === true ) {
            $(inputFileRef.current).fileinput('upload');
        }
    }, [startUpload])    

    // componentDidMount 
    useEffect(() => {
        $(inputFileRef.current).fileinput(fileInputConfig)
        .on('fileloaded', function (event, file, previewId, fileId, index, reader) {
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
        }).on('filebatchuploadsuccess', function (event, data) {
            // console.log('File Batch Upload Success', event, data);
        }).on('filebatchselected', function(event, files) {
            // console.log('File batch selected triggered');
            filebatchselected(event, files)
        }).on('filebeforeload', function(event, file, index, reader) {
            const a = filebeforeload(event, file, index, reader, "change");
            console.log(a)
            return a;
        });;
    }, [initialPreview])

    return <>
        <div>
            <input type="file" multiple name="customers_uploaded_files[]" className='fileInput' ref={inputFileRef} />            
        </div>        
    </>
}

BootstrapFileUpload.propTypes = {
    filebatchuploadcomplete: PropTypes.func.isRequired,
    uploadStartTime: PropTypes.string.isRequired,
    filebeforeload: PropTypes.func.isRequired
}

export default BootstrapFileUpload;