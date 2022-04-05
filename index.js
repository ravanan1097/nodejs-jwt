const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
require("./config/dbconfig").mongoosedb();
const router=require("./router/Router");



app.use(cors());
app.use(bodyparser.json({limit:"50mb"}));
app.use(bodyparser.urlencoded({ limit:"50mb",extended: true }));
app.use("/",router);

const Port = process.env.PORT;
app.listen(Port, () => console.log("Listening Successfully on ", Port));