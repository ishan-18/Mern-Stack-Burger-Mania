import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GS'
import {Link} from 'react-router-dom'

function Cart() {

    const state = useContext(GlobalState);
    const [cart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);


    if(cart.length === 0) return <h2 id="title-1">Cart is Empty</h2>

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart">
                        <img src={product.images.url} alt="" className="img_container"/>
                        <div className="detail_box">
                            <h2>{product.title}</h2>
                            <h3 style={{color: "red"}}>$ {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>
                            <div className="amount">
                                <button style={{color: "orangered"}}> - </button>
                                <span style={{color: "orangered"}}>{product.quantity}</span>
                                <button style={{color: "orangered"}}> + </button>
                            </div>
                            <div className="delete" style={{color: "#333"}}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Total: $ {total}</h3> 
                <Link to="#!">Payment</Link>
            </div>

        </div>
    )
}

export default Cart