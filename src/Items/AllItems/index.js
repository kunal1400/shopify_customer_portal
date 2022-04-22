import { useQuery } from "@apollo/client";
import React from "react";
import moment from 'moment';
import { getCustomerToken } from "../../utils";
import { CUSTOMER_ORDERS } from '../../Customer/Orders/API';
import { Link } from "react-router-dom";
import getS3FolderPath from "../../common-components/getS3PathFromLineItemProperty";

/**
 * Single List UI
 */
const ListHtml = ({ lineItems, orderId, orderName, processedAt, fulfillmentStatus }) => {
    return lineItems.edges.map((item, i) => {
        // custom attribute creation
        let s3FolderPath = null;
        let folderName = null;
        const customAttributes = item.node.customAttributes.map((a, i) => {
            if (a.key === '_uploading_started_at') {
                s3FolderPath = getS3FolderPath(a.value) + '/' + a.value;
                folderName = a.value;
            }

            if (a.key !== '_user_uploaded_files')
                return <div><small key={i}>{a.key}: {a.value}</small></div>
        })

        // returning html for map function
        return <div key={i} className="d-flex justify-content-between align-items-center border p-2 mb-3">
            <div className="text-secondary">{orderName}</div>
            <div>
                {/* <div>{item.node.title} x {item.node.quantity}</div> */}
                <pre>{customAttributes}</pre>
            </div>
            <div>
                <div>{fulfillmentStatus}</div>
                <small>{moment(processedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</small>
            </div>
            <div>
                <Link to={`/edit-item?orderId=${orderId}&folderPath=${s3FolderPath}&folderName=${folderName}`}>Add/Edit Images</Link>
            </div>
        </div>
    })
}

/**
 * List of orders UI
 */
const OrderList = ({ orders }) => {
    if(orders.length > 0) {
        return orders.map((o, j) => <ListHtml
            key={j}
            lineItems={o.node.lineItems}
            orderId={o.node.id}
            orderName={o.node.name}
            processedAt={o.node.processedAt}
            fulfillmentStatus={o.node.fulfillmentStatus}
        />)
    } else {
        return <div className="alert alert-warning">No Items</div>
    }
}

/**
 * Showing the orders list
 */
export const AllItems = () => {
    let customerToken = getCustomerToken();

    const { loading, error, data } = useQuery(CUSTOMER_ORDERS, {
        variables: {
            input: customerToken,
            ordersToShow: 250
        }
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    let { edges, pageInfo } = data.customer.orders;
    // console.log(edges, pageInfo, "customer Orders")

    return <OrderList orders={edges} />
}