const express = require("express")
const router = express.Router();
const productModel = require("../models/product_mdels");
const userModel = require("../models/user_models");

const isLogin =  require("../mildlewares/isLogIn");


router.get("/", function (req, res) {
    let error = req.flash("error");

    res.render("index", { error, isLogin: false });
});

router.get("/shop",isLogin,async function(req,res){
    try {
      
        let products = await productModel.find();
        products = products.map(product => {
            if (product.image) {
                product.imageBase64 = product.image.toString('base64');
            }
            return product;
        }); 
        let success = req.flash("success") 
        console.log(success)
        res.render("shop", {success, products });
    } catch (err) {
        console.error("Error fetching products:", err);
        req.flash("error", "There was an issue loading the products. Please try again later.");
        let success =req.flash("success")
        res.redirect("/",{success});  
    }
})
router.get("/addCart/:id", isLogin, async function (req, res) {
    const productId = req.params.id;

    

 
      
        let user = await userModel.findOne({ email: req.user.email });
        

        // Add the product to the cart
        user.cart.push(productId);
        await user.save();
       

        req.flash("success", "Product added to cart");
        res.redirect("/shop");
        

});


router.get("/cart",isLogin,async function(req,res){
    let user = await userModel.findOne({email:req.user.email}).populate("cart")
    let total = (Number(user.cart[0].price)+20)-Number(user.cart[0].discount)
    res.render("cart",{user , total})
})




module.exports = router;