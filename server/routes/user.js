const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post('/signup', async (req,res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) return res.status(401).json({msg: "Please Enter all the fields"});

        const user = await User.findOne({email});
        if(user) return res.status(401).json({msg: "Email already Exists"});

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return res.status(401).json({msg: "Please Enter a valid Email"});
        }

        if(password.length < 6) return res.status(401).json({msg: 'Password must contain atleast 6 characters'});

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name, 
            email, 
            password: hashPassword
        })

        await newUser.save();

        const accessToken = createAccessToken({id: newUser._id});
        const refreshToken = createRefreshToken({id: newUser._id});

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/user/refresh_token'
        })

        res.json({accessToken})
       // res.json({msg: "Successfully Signed Up"});

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
});

router.get('/refresh_token', async (req,res)=>{
    try {
        const rf_token = req.cookies.refreshToken
        if(!rf_token){
            return res.status(401).json({msg: "Signup or Signin required"});
        }

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
            if(err) res.status(401).json({msg: "Signup or Signin required"});
            const accessToken = createAccessToken({id: user.id});
            res.json({user, accessToken});
        })

        res.json({rf_token});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.post('/signin', async (req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(401).json({msg: "Please Enter all the fields"});

        const user = await User.findOne({email});
        if(!user) return res.status(401).json({msg: "Email does not exists"});

        const doMatch = await bcrypt.compare(password, user.password);
        if(doMatch){
            const accessToken = createAccessToken({id: user._id});
            const refreshToken = createRefreshToken({id: user._id});
    
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })    
            res.json({accessToken})    
        }else{
            return res.status(401).json({msg: "Invalid Email or Password"});
        }
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.get('/logout', async (req,res)=>{
    try {
        res.clearCookie('refreshToken', {path: '/user/refresh_token'});
        return res.json({msg: "User logout Successfully"})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.get('/getUser', auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.patch('/addcart', auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        if(!user) return res.status(401).json({msg: "Please Signin or Signup your account"});

        await User.findOneAndUpdate({_id: req.user.id}, {
            cart: req.body.cart
        })

        return res.json({msg: "Order placed Successfuly"}); 

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

const createAccessToken = (user)=>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}

const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = router;


//Admin 
// {
//     "user": {
//         "role": 1,
//         "cart": [],
//         "_id": "5fda083181f36d244ca7b050",
//         "name": "Anonymous Person4",
//         "email": "anon@anon4.com",
//         "createdAt": "2020-12-16T13:14:25.085Z",
//         "updatedAt": "2020-12-16T13:14:25.085Z",
//         "__v": 0
//     }
// }