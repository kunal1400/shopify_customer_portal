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
                {/* <div className="col-12 mt-5">
                    <button 
                        className="btn btn-secondary"
                        onClick={() => refetch()}
                    >Refetch</button>
                </div> */}
                <div className="col-12 mt-5">
                    <p>This is the Shopify customer portal for Domain - {data && data.shop.primaryDomain.url ? <a target="_blank" href={data.shop.primaryDomain.url}>{data.shop.primaryDomain.url}</a> : ''}. {data && data.description ? data.description : ''}</p>
                </div>
            </div>
        </div>
    )
}

export default Home;