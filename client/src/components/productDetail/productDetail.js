import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Layout from '../Layout/Layout';
import Products from '../productsGrid/Products';
import { apiUrl } from '../homepage/Homepage';

const ProductDetails = () => {
    let { id } = useParams();
    const [productsList, setProductsList] = useState([]);
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setProductsList(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    
    useEffect(() => {
        const selectRandomProducts = (products) => {
            if (products.length > 0) {
                const randomIndexes = [];
                const numberOfRandomProducts = Math.min(4, products.length);

                while (randomIndexes.length < numberOfRandomProducts) {
                    const randomIndex = Math.floor(Math.random() * products.length);
                    if (!randomIndexes.includes(randomIndex)) {
                        randomIndexes.push(randomIndex);
                    }
                }

                const randomProductsArray = randomIndexes.map((index) => products[index]);
                setRandomProducts(randomProductsArray);
            }
        };

        selectRandomProducts(productsList);
    }, [productsList]);
    
    const product = productsList.find(product => product.id === parseInt(id));
    if (!product) return <div>Loading...</div>;

    return (
        <Layout>
            <div className="product-detail-container">
                    <div className="image-container">
                        <img src={`https://inferno-e-commerce.vercel.app/${product.images}`} className="product-detail-image" alt="Product" />
                    </div>

                <div className="product-detail-desc">
                    <h1>{product.name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details:</h4>
                    <p>{product.description}</p>
                    <p className="price">${product.price}</p>

                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus"><AiOutlineMinus /></span>
                            <span className="num">qty</span>
                            <span className="plus"><AiOutlinePlus /></span>
                        </p>
                    </div>

                    <div className="buttons">
                        <button type="button" className="add-to-cart">Add to Cart</button>
                        <button type="button" className="buy-now">Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="product-reviews">
                <h2>Customer Reviews</h2>
                {product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <div key={index} className="review">
                            <p><strong>{review.userID}</strong></p>
                            <div className="stars">
                                {Array(review.rating).fill().map((_, i) => (
                                    <AiFillStar key={i} />
                                ))}
                                {Array(5 - review.rating).fill().map((_, i) => (
                                    <AiOutlineStar key={i} />
                                ))}
                            </div>
                            <p>{review.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            <div className="products-heading">
                <h2>You may also like:</h2>
                <p>Similar products</p>
            </div>

            <Products products={randomProducts} />
        </Layout>
    );
};

export default ProductDetails;