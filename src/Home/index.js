import React from "react";
import { useQuery, NetworkStatus } from "@apollo/client";
import { GET_SHOP_INFO } from "./API";
import { useEffect } from "react/cjs/react.development";

function Home() {
    let { loading, error, data, refetch, networkStatus } = useQuery(GET_SHOP_INFO, {
        // pollInterval: 1000,
        notifyOnNetworkStatusChange: true
    });

    if (networkStatus == NetworkStatus.refetch) {
        return (
            <div className="container">
                <div className="row">
                    Refetching....
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        Loading...
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {JSON.stringify(error)}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <div className="mt-3">
                        <h5 className="font-weight-bold text-center">Features</h5>
                        <div className="shadow p-3">
                            <p>Upload and store images for up to 100 items for free</p>
                            <p>Edit up to 72 images per item</p>
                            <p>Convert your images into 360 degree images, .gifs, 3D scans and NFTs</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="mt-3">
                        <h5 className="font-weight-bold text-center">Pricing</h5>
                        <div className="shadow text-center p-3">
                            <h6 className="text-primary">1 Free Item*</h6>
                            <p>72 Edited images + 2 .gif files</p>
                            <p>per each additional item</p>
                            <p>(*Free with purchase of any turntable)</p>
                            <br />
                            <h6 className="text-primary">$249 USD</h6>
                            <p>72 Edited images + 2 .gif files</p>
                            <p>per each additional item</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;