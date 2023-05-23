const express = require("express")
const router = express.Router();

const { home, userHome, ifHome } = require("../controllers/basicControllers")

router.get("/", home)


router.get("/home/:username",ifHome, userHome)


module.exports = router;