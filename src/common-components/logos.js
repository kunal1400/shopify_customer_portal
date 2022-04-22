import React from 'react';
import { Heading } from './headings';

export const FormLogo = ({heading}) => {
    const style = {
        width: '200px',
        height: 'auto'
    }

    return <div className="mx-auto text-center">
        <img alt="circular-logo" src="https://cdn.shopify.com/s/files/1/0600/4503/3700/files/circle_150x.png" className="img-fluid" />
        <Heading heading={heading}/>
    </div>
}
