const express = require("express");
const mongoose = require('mongoose');
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const fs = require('fs');
const cors = require('cors');

const app = express();
require('dotenv').config()

app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
  }));

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WebCoodee');

}


require("./routes/user.route")(app)
require("./routes/blog.route")(app)

const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server started on port", PORT);
})