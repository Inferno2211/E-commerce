import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Item = (props) => {
    const averageRating = props.reviews.length > 0 
        ? props.reviews.reduce((acc, review) => acc + review.rating, 0) / props.reviews.length 
        : 0;

    const fullStars = Math.floor(averageRating);
    const totalStars = 5;

    return (
        <Link to={`/product/${props.id}`} className="product-card">
            <img src={`https://inferno-e-commerce.vercel.app/${props.images}`} width={250} height={250} className="product-image" alt={props.name} />
            <p className="product-name">{props.name}</p>
            <div className="product-rating">
                {Array.from({ length: fullStars }).map((_, index) => (
                    <AiFillStar key={index} />
                ))}
                {Array.from({length: totalStars - fullStars}).map((_, index) => (
                    <AiOutlineStar key={index} />
                ))}
            </div>
            <div className="product-price">${props.price}</div>
        </Link>
    );
};

export default Item;