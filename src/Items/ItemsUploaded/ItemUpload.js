import React from "react";
// import Dropzone from "../../common-components/FileUpload/Dropzone";
import { BootstrapFileUpload } from "../../common-components/BootstrapFileUpload";

const ItemCategories = [
    "Automotive & Powersports",
    "Baby Products",
    "Consumer Electronics",
    "Fine Art & Collectibles",
    "Furniture",
    "Home & Garden",
    "Industrial & Scientific",
    "Select Photos",
    "Major Appliances",
    "Musical Instruments",
    "Office Products",
    "Person",
    "Pets",
    "Sports Items",
    "Tools & Home Improvement"
]

export const ItemUpload = () => {
    return <>
        <h2>Create Item and Upload Images</h2>
        <p>An Item is anything (a person, a couch, a refrigerator, etc) you took photos of with your Big Turntable that you need edited. You can upload up to 72 unedited images for any item to be edited by our editors. First, create your item and then upload your images.</p>
        <form>
            <div className="mb-4">
                <h6><b>Select Item's Category</b></h6>
                <select className="form-control">
                    {ItemCategories.map((item, i) => <option key={i}>{item}</option>)}
                </select>
            </div>
            <div className="mb-4">
                <h6><b>New Item's Name</b></h6>
                <input type="text" className="form-control" />
            </div>
            <div className="mb-4">
                <h6><b>Select Photos</b></h6>
                {/* <Dropzone /> */}
                <BootstrapFileUpload />
            </div>
            <div className="text-end mb-5">
                <button className="btn btn-primary">Create Item & Upload</button>
            </div>
        </form>
    </>
}