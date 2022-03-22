import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from "@apollo/client";
import $ from 'jquery';
import fileinput from 'bootstrap-fileinput';
import 'bootstrap-fileinput/css/fileinput.min.css';
import { CHECKOUT_CREATE } from '../../Checkout/createCheckout';
import { CHECKOUT_CUSTOMER_ASSOCIATE } from '../../Checkout/associateCustomer';
import { getCustomerToken } from '../../utils';


// Default Time for folder
const uploadStartTime = new Date().toUTCString().replace(/,/g, '').replace(/ /g, "_").replace(/:/g, "_")

// Data for checkout
const dataForCheckoutt = {
    allowPartialAddresses: true,
    buyerIdentity: {
        countryCode: "US"
    },
    customAttributes: {
        key: "greet",
        value: "hello"
    },
    email: "kunal1@mailinator.com",
    lineItems: [{
        quantity: 1,
        variantId: "gid://shopify/ProductVariant/42521901629668"
    }],
    note: "",
    shippingAddress: {
        address1: "123 Test Street",
        city: "New York",
        country: "USA",
        firstName: "Kunal",
        lastName: "Malviya",
        phone: "+16135551111",
        province: "NY",
        zip: "10011"
    }
}

// Data for creating checkout
const dataForCheckout = {
    lineItems: [{
        customAttributes: [{
            key: "greet",
            value: "hello"
        }],
        quantity: 1,
        variantId: `gid://shopify/ProductVariant/${process.env.REACT_APP_IMAGE_ITEM_VARIANT_ID}`
    }]
}

// Initial configuration for fileinput plugin
const fileInputConfig = {
    uploadUrl: `${process.env.REACT_APP_BACKEND_URL}/upload_file`,
    uploadAsync: true,
    minFileCount: 1,
    maxFileCount: 72,
    overwriteInitial: false,
    initialPreviewAsData: true,
    uploadExtraData: function (previewId, index) {
        return {
            _uploading_started_at: uploadStartTime
        }
    },
}

export const BootstrapFileUpload = (props) => {

    let fileInput = useRef();
    let [s3ServerUrls, setS3ServerUrls] = useState([]);
    let [createCheckoutMutationError, setCreateCheckoutMutationError] = useState(false);

    // Checkout create
    let [createCheckout] = useMutation(CHECKOUT_CREATE);

    // Checkout associate customer
    let [checkoutAssociateCustomer] = useMutation(CHECKOUT_CUSTOMER_ASSOCIATE);

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
        }).on('filebatchuploadcomplete', async function (event, preview, config, tags, extraData) {
            // console.log('File Batch Uploaded', event, preview, config, tags, extraData);
            try {
                const responseData = await createCheckout({
                    variables: { input: dataForCheckout }
                })
                let { checkout, checkoutUserErrors } = responseData.data.checkoutCreate;
                if (checkoutUserErrors && checkoutUserErrors.length > 0) {
                    let errorStr = checkoutUserErrors.map(d => d.message).join(", ");
                    setCreateCheckoutMutationError(errorStr)
                } else {
                    await checkoutAssociateCustomer({
                        variables: {
                            checkoutId: checkout.id,
                            customerAccessToken: getCustomerToken()
                        }
                    });
                    console.log(checkout, "checkout")
                    setTimeout(() => {
                        alert("Redirecting to payment page")
                        window.location.href = checkout.webUrl
                    }, 2000)
                }
            } catch (err) {
                console.log(err, "err+err")
            }
        }).on('filebatchuploadsuccess', function (event, data) {
            // console.log('File Batch Upload Success', event, data);
        })

    }, [])

    return <div>
        <div>{createCheckoutMutationError ? <div className='alert alert-danger'>{createCheckoutMutationError}</div> : ''}</div>
        <input type="file" multiple name="customers_uploaded_files[]" className='fileInput' ref={fileInput} />
    </div>
}