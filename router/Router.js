const express=require("express");
const route=express.Router();
const {register,welcome,login}=require("../controller/UserController");
const auth=require("../middleware/authconfig");

route.post("/register",register);
route.post("/welcome",auth,welcome);
route.post("/login",login);

module.exports=route;