import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import {GlobalState} from '../../../../GS';

function ProductItem({product, isAdmin}) {

    const state = useContext(GlobalState);
    const addCart = state.userAPI.addCart;

    return (

        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}/>
            }
            <img src={product.images.url} alt="" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>$ {product.price}</span>
                <p>{product.description}</p>
            </div>

            <div className="btn_row">
                {
                    isAdmin ? 
                    <>
                        <Link id="btn_buy" to="#!">
                            Delete
                        </Link>
                        <Link id="btn_view" to={`/edit_item/${product._id}`} >
                            Edit
                        </Link>
                    </> 
                    : <>
                        <Link id="btn_buy" to="#!" onClick={()=>addCart(product)}>
                            Order
                        </Link>
                        <Link id="btn_view" to={`/detail/${product._id}`} >
                            View
                        </Link>
                      </>
                }
            </div>

        </div>
    )
}

export default ProductItem
