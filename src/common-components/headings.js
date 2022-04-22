import React from 'react';

/**
 * This will return the global Heading
 * @param {*} param0 
 * @returns 
 */
export const Heading = ({heading}) => {
    if(heading) {
        return <h2 className="mb-5 text-center">{heading}</h2>
    } else {
        return "";
    }
}