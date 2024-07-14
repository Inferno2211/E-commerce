import React from 'react';
import { Link } from 'react-router-dom';
const FooterBanner = (product) => {
    return (
        <div className="footer-banner-container">
            <div className="banner-desc">
                <div className="left">
                    <p>20% off</p>
                    <h3>Summer</h3>
                    <h3>Sale</h3>
                    <p>12am IST onwards</p>
                </div>
                
                <img src={product.images} alt="" className="footer-banner-image"/>
                
                <div className="right">
                    <p>{product.category}</p>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <Link to={`/product/${product.id}`}>
                        <button type="button">Shop Now</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default FooterBanner