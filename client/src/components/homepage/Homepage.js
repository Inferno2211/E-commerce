import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import HeroBanner from '../HeroBanner/HeroBanner';
import Products from '../productsGrid/Products';
import Layout from '../Layout/Layout';
import FooterBanner from '../Footer/FooterBanner';

export const apiUrl = process.env.REACT_APP_API_URL;

const Homepage = () => {
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

    const product = productsList.find(product => product.id === 21);
    const product2 = productsList[Math.floor(Math.random() * productsList.length)];
    return (
        <Layout>
            {product && (
                <HeroBanner
                    id={product.id}
                    name={product.name}
                    images={product.images}
                    description={product.description}
                />
            )}

            <div className="products-heading">
                <h2>Best Seller Products</h2>
                <p>There are many variations</p>
            </div>

            <Products products={randomProducts} />

            <div className='product-shop-button'> 
                <Link to={`/products`}>
                    <button type="button">Shop All</button>
                </Link>
            </div>  
            {product2 && (
                <FooterBanner
                id={product2.id}
                name={product2.name}
                images={product2.images}
                description={product2.description}
                category={product2.category}
                />
            )}
        </Layout>
    );
};

export default Homepage;