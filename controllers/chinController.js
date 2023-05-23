const Chin = require("../models/chinpokemonModel")
const User = require("../models/userModel")
const mongoose = require("mongoose");



const postChin = async (req, res) =>{
    const { name, ability1, ability2, ability3, creator } = req.body;

    try{
        const chin = await Chin.create({name, ability1, ability2, ability3, creator });



        res.status(200).json({ chin });



    }catch (error){
        res.status(400).json({ error: error.message})
    }
}



const filterUser = async (req, res) =>{
    const {username} = req.params;

    try{
        const chinPokos = await Chin.find({ creator: username}).sort({createdAt: -1})

        res.render("filtered", {chinPokos, username})
    }catch(error){
        res.status(400).json({error: error.message})
    }

}


const deletePoko = async(req, res)=>{
    const { id }= req.params;

    console.log(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            message: "invalid ID"
        });
    }
    try{
        const chinPokos = await Chin.findOneAndDelete({
            _id: id
        });

        if(!chinPokos){
            return res.status(404).json({
                message: "chinPoko not found"
            });

        }
        res.status(200).json(chinPokos)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "error deleting pokomon"
        })
    }
}


const updatePoko = async(req, res)=>{
    const { id, name, ability1, ability2, ability3 } = req.body;

    const chinpokos = await Chin.findByIdAndUpdate({ _id: id },{name, ability1, ability2, ability3})

    res.status(200).json({chinpokos})
}


const updatePage = async(req, res)=>{
    const { id }= req.params;
    const chinpokomon = await Chin.findById(id)
    console.log(chinpokomon)
    res.render("update", {chinpokomon})
}


module.exports = { postChin, filterUser, deletePoko, updatePoko, updatePage }
