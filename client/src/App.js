import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './components/homepage/Homepage';
import './App.css'
import ProductDetails from './components/productDetail/productDetail';
import ProductsPage from './components/productsPage/ProductsPage';
import Auth from './components/Auth/Auth';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Router>
    );
};

export default App;