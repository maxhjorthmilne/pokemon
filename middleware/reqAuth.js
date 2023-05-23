const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


const checkUser = (req, res, next)=>{
    const token = req.cookies.jwt;



    if(token){
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) =>{
        
            if(err){
                res.locals.user = null;
                next();
            }else{
                let user = await User.findById(decodedToken._id);
                res.locals.user = user;
                console.log(decodedToken._id)
                next();
            }

        } )
    }else{
        res.locals.user = null;
        next();
    }
}

const reqUser = (req, res, next)=>{
    const token = req.cookies.jwt;



    if(token){
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) =>{
        
            if(err){
                res.status(401).json({error: "unauthorized req"})
            }else{
                console.log(decodedToken._id)
                next();
            }

        } )
    }else{
        res.status(401).json({error: "unauthorized req"})
    }
}

module.exports = { checkUser, reqUser };