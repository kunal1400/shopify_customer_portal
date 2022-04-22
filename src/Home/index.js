import React from "react";
import {Link} from "react-router-dom";
import { getCustomerToken } from "../utils";
import {Signup} from "../Signup";

function Home() {
    let isCustomerToken = getCustomerToken();
    return (
        <div className="container">
            <div className="row">                
                {!isCustomerToken ? 
                    <div className="col-sm-5">
                        <div className=" p-4 signup-background">
                            <h3 className="text-center">Create your BigTT Account</h3>
                            <p className="text-center signup-text">Manage your 360 degree photos, .gifs, 3D Scans, and NFT's
                                all from one account. Already have a BigT account ? 
                                <Link to="/login" className="signup-link text-primary">Click here</Link>
                            </p>
                            <Signup cssClasses="row"/>                        
                        </div> 
                    </div>
                : ''}                
                <div className="col-sm-4">
                    <div className="mt-3">
                        <h3 className="font-weight-bold text-center">Features</h3>
                        <div className="shadow p-3">
                            <div className="image-parent">
                                <img style={{height: 60}} alt="imageupload" src="/imageupload.png" className="img-fluid" />  
                               <div className="flex-basis-div"> Upload and store images for up to 100 objects for free</div>
                            </div>
                            <div className="image-parent">
                                <img style={{height: 60}} alt="penciledit" src="/penciledit.png" className="img-fluid" />  
                               <div className="flex-basis-div"> Edit up to 72 images per item</div>
                            </div>
                            <div className="image-parent">
                                <img style={{height: 60}} alt="refresh" src="/refresh.png" className="img-fluid" />  
                               <div className="flex-basis-div">Convert your images into 360 degree images, .gifs, 3D scans and NFTs</div>
                            </div>
                            <div className="group-images">
                                <div className="group-images-child">
                                    <img style={{height: 60}} alt="spinbox" src="/spinbox.png" className="img-fluid" />
                                    <img style={{height: 60}} alt="gif" src="/gif.png" className="img-fluid" />
                                    <img style={{height: 60}} alt="3d" src="/3d.png" className="img-fluid" />
                                    <img style={{height: 60}} alt="nft" src="/nft.png" className="img-fluid" />  
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="mt-3">
                        <h3 className="font-weight-bold text-center">Pricing</h3>
                        <div className="shadow text-center p-2">
                            <h2 className=" font-weight-bold text-primary">1 Free Item*</h2>
                            <div className="pricing-item">
                                <span className="pricing-item-span ">72 Edited images + 2 .gif files</span>
                                <span  className="pricing-item-span">per each additional item</span>
                                <span  className="pricing-item-span">(*Free with purchase of any turntable)</span>
                            </div>                            
                            <br />
                            <br />
                            <h2 className="text-primary">$249 USD</h2>
                            <div className="pricing-item">
                                <span className="pricing-item-span ">72 Edited images + 2 .gif files</span>
                                <span  className="pricing-item-span">per each additional item</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;