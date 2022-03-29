import { useQuery } from "@apollo/client";
import React from "react";
import moment from 'moment';
import { CUSTOMER_ORDERS } from "./API";
import { getCustomerToken } from "../../utils";

/**
 * Single List UI
 */
const ListHtml = ({ order }) => {

    const handleChange = (e) => {
        console.log(e.target.value, "e")
        switch (e.target.value) {
            case "send_receipt":
                break;

            case "manage_images":
                window.location.href = `/customer/items-uploaded/${order.node.id}`
                break;

            default:
                window.location.href = order.node.statusUrl
                break;
        }
    }

    return <div className="d-flex justify-content-between align-items-center border p-2 mb-3">
        <div className="text-secondary">{order.node.name}</div>
        <div>{moment(order.node.processedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
        <div><LineItemsUi lineItems={order.node.lineItems.edges} /></div>
        <div>{order.node.fulfillmentStatus}</div>
        <div>
            <select className="form-control" onChange={handleChange}>
                <option value="">Action</option>
                <option value="send_receipt">Send Receipt</option>
                <option value="manage_images">Add/Edit Images</option>
                <option value="view_payment_details">View payment details</option>
            </select>
        </div>
    </div>
}

/**
 * List of orders UI
 */
const OrderList = ({ orders }) => {
    return orders.map((o, i) => <ListHtml key={i} order={o} />)
}

/**
 * Showing Purchased items in List Html
 */
const LineItemsUi = ({ lineItems }) => {
    return lineItems.map((item, i) => <span key={i}>{item.node.title} x {item.node.quantity}</span>)
}

/**
 * Showing the orders list
 */
export const Orders = () => {
    let customerToken = getCustomerToken();

    const { loading, error, data } = useQuery(CUSTOMER_ORDERS, {
        variables: {
            input: customerToken,
            ordersToShow: 2
        }
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    let { edges, pageInfo } = data.customer.orders;
    // console.log(edges, pageInfo, "customer Orders")

    return <OrderList orders={edges} />
}