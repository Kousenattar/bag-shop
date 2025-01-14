const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");



const {registerUser} = require("../controlers/authcontroler")
const {loginUser} = require("../controlers/authcontroler")
const {logOut} = require("../controlers/authcontroler")



router.get("/",function(req,res){
    res.send("hi");
})

router.post("/register",registerUser )
router.post("/login",loginUser);
router.get("/logout",logOut)


module.exports = router;