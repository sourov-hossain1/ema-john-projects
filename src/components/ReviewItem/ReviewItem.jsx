import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({product, handleRemoveFromCart}) => {
    // console.log(product)
    const {id, img, price, name, quantity} = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='review-details'>
                <p className='product-title'>{name}</p>
                <p>Price: ${price}</p>
                <p>Order quantity{quantity}</p>
            </div>
            <button onClick={()=>handleRemoveFromCart(id)} className='btn-delete'><FontAwesomeIcon icon={faTrashAlt}/></button>
        </div>
    );
};

export default ReviewItem;