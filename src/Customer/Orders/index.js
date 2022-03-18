import { useQuery } from "@apollo/client";
import React from "react";
import { CUSTOMER_ORDERS } from "./API";
import { getCustomerToken } from "../../utils";

export const Orders = () => {
    let customerToken = getCustomerToken();

    const { loading, error, data } = useQuery(CUSTOMER_ORDERS, {
        variables: {
            input: customerToken
        }
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    console.log(data, "customer Orders")

    if (data.orders > 0) {
        return <div>Perform orders</div>
    }
    else {
        return <div>No Orders</div>
    }
}