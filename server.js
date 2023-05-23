require("dotenv").config()

//app dependencies

//talk to the db
const mongoose = require("mongoose")

//makes it easier to controll routes
const express = require("express")

//cookieparser 
const cookieParser = require("cookie-parser")

//ref to Routes
const userRoutes = require("./routes/userRoutes")
const basicRoutes = require("./routes/basicRoutes")
const chinRoutes = require("./routes/chinRoutes")
const { checkUser } = require("./middleware/reqAuth")

//creates app
const app = express();

//view engine 
app.set('view engine', 'ejs'); //There are several types of view engines that you can use, ejs is a popular choice.
app.use(express.urlencoded({extended:true}));
app.use(express.static("public")); //public folders
app.use(cookieParser())

app.use(express.json());    
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

app.get("*", checkUser)

//routes
app.use("/api/user", userRoutes)


app.use(basicRoutes)
app.use(userRoutes)
app.use(chinRoutes)



//db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(process.env.PORT, ()=>{
            console.log("listening on port: " + process.env.PORT)
        })
    })
    .catch(error => console.log(error))