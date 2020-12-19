import React, {useState, useContext} from 'react'
import { GlobalState } from '../../GS'
import {FaHamburger, FaTimes, FaShoppingCart, FaUtensils} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Header = () => {

    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart; 

    const logoutUser = async () =>{
        await axios.get('/user/logout');
        localStorage.clear();
        setIsAdmin(false);
        setIsLogged(false);
    }

    const adminRouter = ()=>{
        return(
            <>
                <li><Link to="/create_item">Create Item</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = ()=>{
        return(
            <>
                <li><Link to="/history">Order History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    return (
        <header>
            <div className="menu">
                <i><FaHamburger size="30px"/></i>
            </div>

            <div className="logo">
                <h1><Link to="/">{isAdmin ? 'Admin' : 'Burger'}</Link></h1>
            </div>

            <ul>
                <li><Link to="/">{isAdmin ? 'Burger' : 'Burger' }</Link></li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login & Register</Link></li>
                }

                <li>
                    <i><FaTimes size="30px" className="menu" /></i>
                </li>

            </ul>

            {
                isAdmin ? '' 
                : <div className="cart-icon">
                    <span>{cart.length}</span><Link to="/cart"><FaUtensils size="30" /></Link>
                </div>
            }
        </header>
    )
}

export default Header
