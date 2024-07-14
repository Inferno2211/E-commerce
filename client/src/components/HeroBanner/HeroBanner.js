import React from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css'

const HeroBanner = (product) => {
    return (
        <div className="hero-banner-container">
        <div>
            <p className="beats-solo">{product.name}</p>
            <h3>Summer Sale</h3>
            <h1>Fine</h1>
            <img src={product.images} alt="headphones" className="hero-banner-image" />

            <div>
            <Link to={`/product/${product.id}`}>
                <button type="button">Shop Now</button>
            </Link>
            <div className="desc">
                <h5>Description</h5>
                <p>{product.description}</p>
            </div>
            </div>
        </div>
        </div>
    )
}
export default HeroBanner;