const User = require("../models/userModel")
const jwt = require("jsonwebtoken");
const router = require("../routes/userRoutes");


//max age :D
const maxAge = 3*24*60*60*1000


//create web token

const webToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: "5d"});
}

const loginUser = async (req, res) =>{
    const { email, password } = req.body;


    try{
        const user = await User.login(email, password);

        //create token for user
        const token = webToken(user._id);


        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge})

        res.status(200).json({ email, token, user: user._id});



    }catch (error){
        res.status(400).json({ error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        // create a token
        const token = webToken(user._id);
        
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge})

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
}


//log out :D 
const logout = (req, res)=>{
    res.cookie("jwt", "", {maxAge: 1})
    res.redirect("/")
}



module.exports = { loginUser, signupUser, logout }