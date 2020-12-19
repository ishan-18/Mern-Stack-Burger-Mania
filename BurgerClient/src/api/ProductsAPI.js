import {useState, useEffect} from 'react'
import axios from 'axios';

function ProductsAPI() {
    const [product, setProduct] = useState([]);

    const getProducts = async () =>{
        const res = await axios.get('/api/product');
        setProduct(res.data.product);
    }

    useEffect(()=>{
        getProducts()
    }, [])

    return {products: [product, setProduct]}
}

export default ProductsAPI
