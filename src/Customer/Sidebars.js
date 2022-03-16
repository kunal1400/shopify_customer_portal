import React from "react";
import { Link } from "react-router-dom";

export const DefaultSidebar = ({ items }) => {
    const liItems = items.map((d, i) => <li key={i}><Link to={d.link}>{d.label}</Link></li>)
    return <ul className="list-unstyled">{liItems}</ul>
}