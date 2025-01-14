const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");



let {generateToken}  = require("../utils/generateToken")
const userModel = require("../models/user_models");
const flash = require("connect-flash/lib/flash");

module.exports.registerUser = async function(req,res){
    try {
        let {fullName,email,password} =  req.body;
        const user = await userModel.findOne({  email:email });
        if (user) {
            req.flash("error","Account already exists. please login.");
            
        }
   
        let pass =  await bcrypt.hash(password,10);
        let createdUser = await userModel.create({
            fullName,
            email,
            password:pass
        });

        let token = generateToken(createdUser);
        res.cookie("token",token);
       
        res.redirect("/");
    } catch (error) {
        return res.status(500).send(error.message);
    }
   
}
module.exports.loginUser = async function(req,res){
    let {email , password} = req.body;
    let user = await userModel.findOne({email : email})
    if(!user) res.send("somthing went wrong");
    else{
        bcrypt.compare(password,user.password , function(err , result){
            if(result){
                let token = generateToken(user);
                res.cookie("token",token);
                res.redirect("/shop")
            }
            // else{
            //     res.send(err.message)
            // }
           
            
        })
    }
}

module.exports.logOut = function(req , res){
    res.cookie("token","")
    res.redirect("/")
}

