const jwt = require('jsonwebtoken');

const auth = (req,res,next) =>{
    try {
        const token = req.header("Authorization");
        if(!token) return res.status(401).json({msg: "Signup1 or Signin required"});

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if(err) throw res.status(401).json({msg: "Signup or Signin required"});

            req.user = user;
            next();
        })
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
}

module.exports = auth;