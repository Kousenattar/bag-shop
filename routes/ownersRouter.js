const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_models");


router.get("/",function(req,res){
    res.send("hi");
})


if(process.env.NODE_ENV ==="development"){
    router.post("/create", async function(req,res){
        let owner = await ownerModel.find();
        //if(owner.length > 0){
        //     return res.send(503).send("no permission to create new owner")
        // }
        
        let {fullName,email,password} =  req.body;
        let createdOwner = await ownerModel.create({
            fullName,
            email,
            password
        });
         
       
        res.status(201).send(createdOwner);
    
    
    })
}    
    

router.get("/admin", function(req,res){
    let success = req.flash("success")
    res.render("createProducts",{success})
})


module.exports = router;