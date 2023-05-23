const express = require("express")
const router = express.Router();


//controller functions

const { loginUser, signupUser, logout } = require("../controllers/userController")
const { login, signup } = require("../controllers/basicControllers")


//login routes
router.post("/login", loginUser)
router.get("/login", login)

//signup routes
router.post("/signup", signupUser)
router.get("/signup", signup)

//logout :D
router.get("/logout", logout)


//all post and get routes under need auth "move later"
// router.use(reqAuth)



module.exports = router;