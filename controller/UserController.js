const User = require("../models/User");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { token_key } = process.env

exports.register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!(userName && email && password)) return res.json("Please Enter All Fields");

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.json("User Already Exists");

        const encPass = await bycrpt.hash(password, 8);

        await User.create({
            username: userName,
            email: email,
            password: encPass

        });

        res.json("User Created Successfully");
        console.log("User Created Successfully");
    }
    catch (err) {
        console.log("Error Occured: " + err),
            res.json(err);
    }

};

exports.welcome = (req, res) => {
    try {
        const { msg } = req.body;
        if (msg) return res.json("Welcome")
    }
    catch (err) {
        console.log(err)
    }
};

exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (!(email && password)) return res.json("Please Enter Email and Password");
        const currentUser = await User.findOne({ email });
        const checkPass = await bycrpt.compare(password, currentUser.password);
        if (currentUser && checkPass) {
            const jwtToken = jwt.sign({ id: currentUser._id ,email:email,name:currentUser.userName}, token_key, { expiresIn: "1h" });

            const cred = {};
            cred.accessToken = jwtToken
            return res.json(cred);
        }

    }
    catch (err) {
        console.log("Error: " + err);
        return res.json(err);
    }
}