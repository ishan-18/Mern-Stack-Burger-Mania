import React, {useState, useEffect} from 'react';
import axios from 'axios';

function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        if(token){
            const getUser = async ()=>{
                try {
                    const res = await axios.get('/user/getUser', {
                        headers: {Authorization: token}
                    });
                    console.log(res);

                    setIsLogged(true);
                    res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                    setCart(res.data.user.cart)

                } catch (err) {
                    alert(err.response.data.msg);
                }
            }

            getUser();
        }
    },[token]);

    const addCart = async (product) =>{
        if(!isLogged) return alert("Please Signin or Signup your account")

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}]);

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]},{
                headers: {Authorization: token},
            })

        }else{
            alert("This Item has been added to the Order List");
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart
    }
}

export default UserAPI
