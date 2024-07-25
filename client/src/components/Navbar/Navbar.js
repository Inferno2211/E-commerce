import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShopping } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            alert("Please sign in to continue!");
        } else {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="navbar-container">
            <p className="logo">
                <Link to="/">Inferno Headphones</Link>
            </p>
            <div className='info-container'>
                <div className='user-status'>
                        {user ?(
                        <div className="user-panel">
                            <p>Hi, {user.name}!</p>
                            <img src={user.picture} alt="Profile" />
                            <br />
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) :(
                        <button>
                            <Link to="/auth">Login</Link>
                        </button>
                    )}
                </div>

                <Link to='/products'>
                    <button type="button" className="cart-icon">
                        <AiOutlineShopping />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;