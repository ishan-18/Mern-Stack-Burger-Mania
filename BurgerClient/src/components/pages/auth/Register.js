import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import hamburger from '../../../images/hamburger.png'

function Register() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }

    const registerSubmit = async e =>{
        e.preventDefault();
        try {
            await axios.post('/user/signup', {...user})

            localStorage.setItem('firstLogin', true)

            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <img src={hamburger} alt="" width="80px" />
                <h2 style={{color: "#000"}}>Register</h2>
                <input type="text" name="name" placeholder="Enter your Name" value={user.name} onChange={onChangeInput} style={{color: "#000"}} required/>
                <input type="email" name="email" placeholder="Enter your Email" value={user.email} onChange={onChangeInput} style={{color: "#000"}} required/>
                <input type="password" name="password" placeholder="Enter your Password" value={user.password}  onChange={onChangeInput} style={{color: "#000"}} required />

            <div className="row">
                <button type="submit" value="submit" name="submit">Register</button>
                <Link to="/login">Already Have an Account?</Link>
            </div>
            </form>
        </div>
    )
}

export default Register
