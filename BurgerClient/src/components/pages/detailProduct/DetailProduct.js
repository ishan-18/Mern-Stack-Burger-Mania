import React, {useContext, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {GlobalState} from '../../../GS';
import ProductItem from '../utils/productItem/ProductItem';

function DetailProduct() {

    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(()=>{
        if(params.id){
            products.forEach(product =>{
                if(product._id === params.id) setDetailProduct(product);
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt=""/>
                <div className="detail_box">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6 style={{color: "orangered"}}>{detailProduct.product_id}</h6>
                    </div>
                    <span style={{color: "red"}}>$ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p id="sold">Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart">Place Order</Link>
                </div>
            </div>

            <div>
                <h1 className="heading">Related Products</h1>
                <div className="products">
                    {
                        products.map(product =>{
                            return product.category === detailProduct.category ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>

    )
}

export default DetailProduct
