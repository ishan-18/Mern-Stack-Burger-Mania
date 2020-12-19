import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import hamburger from '../../../images/hamburger.png'

function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }

    const loginSubmit = async e =>{
        e.preventDefault();
        try {
            await axios.post('/user/signin', {...user})

            localStorage.setItem('firstLogin', true)

            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <img src={hamburger} alt="" width="80px" />
                <h2 style={{color: "#000"}}>Login</h2>
                <input type="email" name="email" placeholder="Enter your Email" value={user.email} onChange={onChangeInput} style={{color: "#000"}} required/>
                <input type="password" name="password" placeholder="Enter your Password" value={user.password}  onChange={onChangeInput} style={{color: "#000"}} required />

            <div className="row">
                <button type="submit" value="submit" name="submit">Login</button>
                <Link to="/register" style={{color: "#000"}}>Create An Account?</Link>
            </div>
            </form>
        </div>
    )
}

export default Login
