import React, { useEffect, useState } from 'react';
import Products from '../productsGrid/Products';
import './ProductsPage.css'; // Import your CSS file
import Layout from '../Layout/Layout';
import { apiUrl } from '../homepage/Homepage';

const ProductsPage = () => {
    const [productsList, setProductsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setProductsList(data);

                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);

                const uniqueColors = [...new Set(data.map(product => product.color))];
                setColors(uniqueColors);

                const prices = data.map(product => product.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                setMinPrice(minPrice);
                setMaxPrice(maxPrice);
                setPriceRange([minPrice, maxPrice]);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const updateURLParams = (params) => {
        const url = new URL(window.location);
        Object.keys(params).forEach(key => {
            if (params[key]) {
                url.searchParams.set(key, params[key]);
            } else {
                url.searchParams.delete(key);
            }
        });
        window.history.pushState({}, '', url);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        updateURLParams({ category: value });
    };

    const handleRatingChange = (e) => {
        const value = e.target.value;
        setSelectedRating(value);
        updateURLParams({ rating: value });
    };

    const handleColorChange = (e) => {
        const value = e.target.value;
        setSelectedColor(value);
        updateURLParams({ color: value });
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
        updateURLParams({ sort: value });
    };

    const handlePriceChange = (e) => {
        const value = Number(e.target.value);
        if (e.target.name === "minPrice") {
            setPriceRange([value, priceRange[1]]);
            updateURLParams({ minPrice: value });
        } else {
            setPriceRange([priceRange[0], value]);
            updateURLParams({ maxPrice: value });
        }
    };

    const applySorting = (products) => {
        switch (sortOrder) {
            case 'price-asc':
                return products.slice().sort((a, b) => a.price - b.price);
            case 'price-desc':
                return products.slice().sort((a, b) => b.price - a.price);
            case 'rating':
                return products.slice().sort((a, b) => {
                    const avgRatingA = calculateAverageRating(a);
                    const avgRatingB = calculateAverageRating(b);
                    return avgRatingB - avgRatingA; // Sort by descending rating
                });
            case 'alphabetical':
                return products.slice().sort((a, b) => a.name.localeCompare(b.name));
            default:
                return products;
        }
    };

    const calculateAverageRating = (product) => {
        if (!product.reviews || product.reviews.length === 0) return 0;
        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / product.reviews.length;
    };

    const applyFiltering = (products) => {
        let filteredProducts = products;
        if (selectedRating) {
            filteredProducts = filteredProducts.filter(product => calculateAverageRating(product) >= selectedRating);
        }
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }
        if (selectedColor) {
            filteredProducts = filteredProducts.filter(product => product.color === selectedColor);
        }
        if (priceRange) {
            filteredProducts = filteredProducts.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
        }

        return filteredProducts;
    };

    const sortedProducts = applySorting(productsList);
    const filteredProducts = applyFiltering(sortedProducts);

    return (
        <Layout>
            <div className="container">
                <div className="sidebar">
                    <h3>Filter by Rating</h3>
                    <select onChange={handleRatingChange} value={selectedRating}>
                        <option value="">Any</option>
                        <option value="5">5 Stars only</option>
                        <option value="4">4 Stars and above</option>
                        <option value="3">3 Stars and above</option>
                        <option value="2">2 Stars and above</option>
                        <option value="1">1 Star and above</option>
                    </select>

                    <h3>Filter by Category</h3>
                    <select onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="">All</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    <h3>Filter by Color</h3>
                    <select onChange={handleColorChange} value={selectedColor}>
                        <option value="">All</option>
                        {colors.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                
                    <h3>Filter by Price</h3>
                    <div>
                        <label>Min Price: </label>
                        <input
                            type="range"
                            name="minPrice"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[0]}
                            onChange={handlePriceChange}
                        />
                        <span>{priceRange[0]}</span>
                    </div>
                    
                    <div>
                        <label>Max Price: </label>
                        <input
                            type="range"
                            name="maxPrice"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={handlePriceChange}
                        />
                        <span>{priceRange[1]}</span>
                    </div>
                </div>

                <div className="main-content">
                    <div className="sort-bar">
                        <h3>Sort by:</h3>
                        <select onChange={handleSortChange} value={sortOrder}>
                            <option value="">Select</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Rating: High to Low</option>
                            <option value="alphabetical">Alphabetical</option>
                        </select>
                    </div>
                    <div className="products">
                        <Products products={filteredProducts} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductsPage;