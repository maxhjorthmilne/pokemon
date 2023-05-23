const express = require("express")
const router = express.Router();

const { postChin, filterUser, deletePoko, updatePoko, updatePage } = require("../controllers/chinController");
const { reqUser } = require("../middleware/reqAuth");

router.post("/chin",reqUser, postChin)

router.get("/:username", filterUser)

router.delete("/deletePokos/:id",reqUser, deletePoko)

router.post("/updatePoko",reqUser, updatePoko)

router.get("/updatePoko/:id",reqUser, updatePage)

module.exports = router;