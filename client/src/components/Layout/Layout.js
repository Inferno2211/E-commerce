import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <title>Inferno Store</title>
            <header><Navbar /></header>
            <div className="main-container">
                {children}
            </div>
            <footer><Footer /></footer>
        </div>
    );
};

export default Layout;