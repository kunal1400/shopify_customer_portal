import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const EditItem = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let folderPath = searchParams.get('folderPath');

    let [images, SetImages] = useState([])

    // Getting all images from this folder
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/files?folder=${folderPath}`)
            .then(res => res.json())
            .then(resData => SetImages(resData.data.Contents))
    }, [])

    if (!folderPath) {
        return <div>No Items in folder</div>
    } else {
        return <div className='container'>
            <div className='row'>
                <AllCards items={images} />
            </div>
        </div>
    }
}

const AllCards = ({ items }) => {
    return items.map((item, i) => {
        return <div className='col-sm-2 mb-4'>
            <div className='card shadow-lg'>
                <img className='image-card-top cardFixedAspectRatio' src={`${process.env.REACT_APP_BUCKET_URL}/${item.Key}`} alt={item.ETag} />
                <div className='card-body border-top'>
                    <div className='d-flex justify-content-around'>
                        <button className='btn btn-primary'>Edit</button>
                        <button className='btn btn-danger'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    })
}