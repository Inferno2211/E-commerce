import React from 'react';
import './Products.css';
import Item from '../Item/Item';

const Products = ({products}) => {

    return (
        <div className="products-container">
            {products.map((product) => (
                <Item
                    id={product.id}
                    key={product.id}
                    name={product.name}
                    images={product.images}
                    price={product.price}
                    reviews={product.reviews}
                />
            ))}
        </div>
    );
};

export default Products;