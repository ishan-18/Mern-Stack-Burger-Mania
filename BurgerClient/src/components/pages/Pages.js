import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import Products from './products/Products'
import NotFound from './utils/NotFound/NotFound';
import DetailProduct from './detailProduct/DetailProduct';


const Pages = () => {
    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Pages
