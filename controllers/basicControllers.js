const  ChinPokos  = require("../models/chinpokemonModel")

// This file just keeps all the basic controller for the sake of example
// It might be considered a bit pedantic to create named functions for 
// a small program such as this, but it is good practice anyhow!


const home = (req, res, next) => {
    ChinPokos.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('home', { chinPokos: result});
    })
    

}



const userHome = async (req, res) =>{
    const {username} = req.params;

    try{
        const chinPokos = await ChinPokos.find({ creator: username}).sort({createdAt: -1})

        res.render("userHome", {chinPokos, username})
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

const ifHome = (req, res, next) =>{
    const searchedUsername = req.params.username;
    const loggedInUser = res.locals.user.email;

    if(searchedUsername === loggedInUser){
        next();
    }else{
        res.redirect("/")
    }

}

const login = (req, res, next) => {
    res.render('login');
}

const logout = (req, res, next) => {
    res.render('logout');
}

const signup = (req, res, next) => {
    res.render('signup');
}


module.exports = {
    home,
    login,
    logout,
    signup,
    userHome,
    ifHome,}
