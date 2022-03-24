import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import BootstrapFileUpload from "../../common-components/BootstrapFileUpload";
import { CHECKOUT_CREATE } from '../../Checkout/createCheckout';
import { CHECKOUT_CUSTOMER_ASSOCIATE } from '../../Checkout/associateCustomer';
import { getCustomerToken } from '../../utils';
import { CHECKOUT_COMPLETE_FREE } from '../../Checkout/checkoutCompleteFree';

const ItemCategories = [
    "Select Photos",
    "Automotive & Powersports",
    "Baby Products",
    "Consumer Electronics",
    "Fine Art & Collectibles",
    "Furniture",
    "Home & Garden",
    "Industrial & Scientific",
    "Major Appliances",
    "Musical Instruments",
    "Office Products",
    "Person",
    "Pets",
    "Sports Items",
    "Tools & Home Improvement"
]

// // Data for checkout
// const dataForCheckoutt = {
//     allowPartialAddresses: true,
//     buyerIdentity: {
//         countryCode: "US"
//     },
//     customAttributes: {
//         key: "greet",
//         value: "hello"
//     },
//     email: "kunal1@mailinator.com",
//     lineItems: [{
//         quantity: 1,
//         variantId: "gid://shopify/ProductVariant/42521901629668"
//     }],
//     note: "",
//     shippingAddress: {
//         address1: "123 Test Street",
//         city: "New York",
//         country: "USA",
//         firstName: "Kunal",
//         lastName: "Malviya",
//         phone: "+16135551111",
//         province: "NY",
//         zip: "10011"
//     }
// }

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

export const ItemUpload = () => {
    // Form data
    let [imageFormData, setFormData] = useState({
        category: "",
        itemName: ""
    })

    let [uploadedFiles, setUploadedFiles] = useState([])
    let [callAddToCart, setCallAddToCart] = useState(false)

    let [createCheckoutMutationError, setCreateCheckoutMutationError] = useState(false);

    // Checkout create
    let [createCheckout] = useMutation(CHECKOUT_CREATE);

    // Checkout associate customer
    let [checkoutAssociateCustomer] = useMutation(CHECKOUT_CUSTOMER_ASSOCIATE);

    // Checkout complete free
    let [checkoutCompleteFree] = useMutation(CHECKOUT_COMPLETE_FREE);

    const handleInput = (e) => {
        e.preventDefault();
        // let imageFormData = Object.assign({}, formData, { [e.target.name]: e.target.value });
        let newImageFormData = { ...imageFormData, [e.target.name]: e.target.value };
        setFormData(newImageFormData);
    }

    // After all files are uploaded in s3
    const afterUpload = (extra, s3ServerUrls) => {
        setUploadedFiles(s3ServerUrls)
        setCallAddToCart(extra)
    }

    const createCheckoutApi = async () => {
        if (callAddToCart && uploadedFiles.length > 0) {
            try {
                // Creating checkout
                const responseData = await createCheckout({
                    variables: {
                        input: {
                            lineItems: [{
                                customAttributes: [
                                    {
                                        key: 'category',
                                        value: imageFormData['category']
                                    },
                                    {
                                        key: 'itemName',
                                        value: imageFormData['itemName']
                                    },
                                    {
                                        key: '_uploading_started_at',
                                        value: callAddToCart['_uploading_started_at']
                                    },
                                    {
                                        key: '_user_uploaded_files',
                                        value: uploadedFiles.join(",")
                                    }
                                ],
                                quantity: 1,
                                variantId: `gid://shopify/ProductVariant/${process.env.REACT_APP_IMAGE_ITEM_VARIANT_ID}`
                            }]
                        }
                    }
                })

                // Extracting the response
                let { checkout, checkoutUserErrors } = responseData.data.checkoutCreate;
                if (checkoutUserErrors && checkoutUserErrors.length > 0) {
                    let errorStr = checkoutUserErrors.map(d => d.message).join(", ");
                    setCreateCheckoutMutationError(errorStr)
                } else {

                    // Associating the customer to the checkout
                    await checkoutAssociateCustomer({
                        variables: {
                            checkoutId: checkout.id,
                            customerAccessToken: getCustomerToken()
                        }
                    });

                    // Completing checkout free
                    await checkoutCompleteFree({
                        variables: {
                            checkoutId: checkout.id
                        }
                    })

                    // // Redirecting to the checkout
                    // setTimeout(() => {
                    //     alert("Redirecting to payment page")
                    //     window.location.href = checkout.webUrl
                    // }, 2000)
                }
            } catch (err) {
                console.log(err, "err+err")
            }
        }
    }

    useEffect(() => {
        createCheckoutApi()
    }, [callAddToCart])

    return <>
        <h2>Create Item and Upload Images</h2>
        <p>An Item is anything (a person, a couch, a refrigerator, etc) you took photos of with your Big Turntable that you need edited. You can upload up to 72 unedited images for any item to be edited by our editors. First, create your item and then upload your images.</p>
        <div>{createCheckoutMutationError ? <div className='alert alert-danger'>{createCheckoutMutationError}</div> : ''}</div>
        <form>
            <div className="mb-4">
                <h6><b>Select Item's Category</b></h6>
                <select onChange={handleInput} className="form-control" name="category">
                    {ItemCategories.map((item, i) => <option key={i}>{item}</option>)}
                </select>
            </div>
            <div className="mb-4">
                <h6><b>New Item's Name</b></h6>
                <input type="text" className="form-control" onInput={handleInput} name="itemName" />
            </div>
            <div className="mb-4">
                <h6><b>Select Photos</b></h6>
                {/* <Dropzone /> */}
                <BootstrapFileUpload filebatchuploadcomplete={afterUpload} />
            </div>
        </form>
    </>
}