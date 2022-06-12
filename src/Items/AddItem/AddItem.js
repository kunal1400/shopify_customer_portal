import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import BootstrapFileUpload from "../../common-components/BootstrapFileUpload";
import { CHECKOUT_CREATE } from '../../Checkout/createCheckout';
import { CHECKOUT_CUSTOMER_ASSOCIATE } from '../../Checkout/associateCustomer';
import { getCustomerToken, dateWiseFolder, currentTime } from '../../utils';
import { CHECKOUT_COMPLETE_FREE } from '../../Checkout/checkoutCompleteFree';
import Modal from "../../common-components/Modal";

const ItemCategories = [
    {label: "Select Photos", val: 0},
    {label: "Automotive & Powersports", val: 1},
    {label: "Baby Products", val: 2},
    {label: "Consumer Electronics", val: 3},
    {label: "Fine Art & Collectibles", val: 4},
    {label: "Furniture", val: 5},
    {label: "Home & Garden", val: 6},
    {label: "Industrial & Scientific", val: 7},
    {label: "Major Appliances", val: 8},
    {label: "Musical Instruments", val: 9},
    {label: "Office Products", val: 10},
    {label: "Person", val: 11},
    {label: "Pets", val: 12},
    {label: "Sports Items", val: 13},
    {label: "Tools & Home Improvement", val: 14}
]

export const ItemUpload = () => {
    // Form data
    let [imageFormData, setFormData] = useState({ category: "", itemName: ""});
    let [uploadedFiles, setUploadedFiles] = useState([]);
    let [callAddToCart, setCallAddToCart] = useState(false);    
    let [createCheckoutMutationError, setCreateCheckoutMutationError] = useState(false);
    let [startUploadFlag, setStartUploadFlag] = useState(false);
    let [show, setShow] = useState(false);
    let formRef = useRef();

    // Checkout create
    let [createCheckout] = useMutation(CHECKOUT_CREATE);
    let [checkoutAssociateCustomer] = useMutation(CHECKOUT_CUSTOMER_ASSOCIATE);
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
                                        value: JSON.stringify(uploadedFiles)
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

                    // Redirecting to the checkout
                    setTimeout(() => {
                        // alert("Redirecting to payment page")
                        window.location.href = checkout.webUrl
                    }, 2000)
                }
            } catch (err) {
                console.log(err, "err+err")
            }
        }
    }

    const afterBatchFileSelected = (event, files) => {
        setShow(true);     
    }

    const hideModal = (event) => {
        event.preventDefault();
        setShow(false);
    }

    const goToCart = (event) => {
        event.preventDefault();
        setStartUploadFlag(true);
        setShow(false);
    }

    const filebeforeload = (event, file, index, reader) => {
        const category = formRef.current.elements.namedItem("category");
        const itemName = formRef.current.elements.namedItem("itemName");
        console.log(category.value, "category")
        if( !category.value || category.value == "Select Photos" ) {
            category.classList.add("required");
            return false;
        }
        else if( !itemName.value ) {
            itemName.classList.add("required");
            return false;
        }
        else {
            category.classList.remove("required");
            itemName.classList.remove("required");
            return true;
        }
    }

    useEffect(() => {
        createCheckoutApi()
    }, [callAddToCart])

    return <>
        {console.log(imageFormData, "imageFormData")}
        <h2>Create Item and Upload Images</h2>
        <p>An Item is anything (a person, a couch, a refrigerator, etc) you took photos of with your Big Turntable that you need edited. You can upload up to 72 unedited images for any item to be edited by our editors. First, create your item and then upload your images.</p>
        <div>{createCheckoutMutationError ? <div className='alert alert-danger'>{createCheckoutMutationError}</div> : ''}</div>
        <form ref={formRef}>
            <div className="mb-4">
                <h6><b>Select Item's Category</b></h6>
                <select onChange={handleInput} className="form-control" name="category">
                    {ItemCategories.map((item, i) => <option value={i.val} key={i}>{item.label}</option>)}
                </select>
            </div>
            <div className="mb-4">
                <h6><b>New Item's Name</b></h6>
                <input type="text" className="form-control" onInput={handleInput} name="itemName" />
            </div>
            <div className="mb-4">
                <h6><b>Select Photos</b></h6>
                <BootstrapFileUpload 
                    filebatchuploadcomplete={afterUpload} 
                    filebatchselected={afterBatchFileSelected}
                    uploadStartTime={dateWiseFolder()+'/'+currentTime} 
                    startUpload={startUploadFlag}
                    filebeforeload={(imageFormData) => filebeforeload(imageFormData)}
                />                
                <Modal show={show} onClose={() => setShow(false)}>
                    <div className="my-5 content d-flex justify-content-center">
                        <button onClick={hideModal} className='btn btn-primary mx-2'>Edit / Add Images</button>
                        <button onClick={goToCart} className='btn btn-primary mx-2'>Go to Cart</button>
                    </div>
                </Modal>
            </div>
        </form>
    </>
}