const {Router} = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin",(req,res)=>{
    res.render("signin");
})

router.get("/signup",(req,res)=>{
    res.render("signup");
})

router.get("/profile",(req,res)=>{
    res.render("addProfile",{
        user : req.user,
    });
})

router.post("/profile", async (req,res)=>{
    return res.render("home");
})

router.post("/signin", async(req,res)=>{
    const {email,password} = req.body;
    try{
        const userToken = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",userToken).redirect("/");
    }
    catch(error){
        return res.render("signin",{
            error:"incorrect password or username",
        });
    }
})

router.post("/signup",async (req,res)=>{
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password,
    })
    return res.render("/user/signin");
})


router.get("/logout",async (req,res)=>{
    res.clearCookie("token").redirect("/");
})


module.exports = router;