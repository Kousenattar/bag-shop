const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config")
const productModel = require("../models/product_mdels");



router.get("/",function(req,res){
    res.send("hi");
})

router.post("/create", upload.single("image"), async function(req,res){

    try{    
        let  {image , name , price , discount ,  bgcolor ,  panelcolor , textcolor} = req.body
   
        let product = await productModel.create({
            image: req.file.buffer,
            name ,
            price, 
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        }) 
        


        req.flash("success","product create succefully")
        res.redirect("/owners/admin")
    }catch{
        res.send("error")
    }
   

})

   
module.exports = router;
  