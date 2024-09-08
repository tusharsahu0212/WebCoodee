const userSchema = require("../models/user.model")
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User', userSchema);


//signUp
pSignup = async (req, res) => {

    console.log(req.body);
    User.findOne({ username: req.body.username }).then(async (data, err) => {

        if (data) {
            return res.status(400).json({ message: "username already exist"});

        } else {
            const newUser = new User({

                username: req.body.username,
                password: req.body.password

            });

            await newUser.save();

            const user = {username:req.body.username, password:req.body.password};
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({ message: "user created", ACCESS_TOKEN:accessToken});
        }

    });



}

//login
pLogin = (req, res) => {

    User.findOne({ username: req.body.username }).then((data, err) => {


        if (data) {

            if (data.password == req.body.password) {

            
                const user = {username:req.body.username, password:req.body.password};
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                return res.status(200).json({ message: "you loged in", ACCESS_TOKEN:accessToken});
            } else {
                return res.status(400).json({ message: "Incorrect Password!"});
            }
        } else {
            return res.status(400).json({ message: "User Not Found!"});
        }

    });

}

// get user name

getUserName = (req,res) =>{

    try {
        const decoded = jwt.verify(req.cookies['ACCESS_TOKEN'], process.env.ACCESS_TOKEN_SECRET);
        const username = decoded.username

        return res.status(200).json({username});
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }

}

//Change Password

changePassword = (req,res) => {

    try {
        const decoded = jwt.verify(req.cookies['ACCESS_TOKEN'], process.env.ACCESS_TOKEN_SECRET);
        const username = decoded.username

        console.log(username)
        console.log(req.body)
        if(req.body.newPassword !== req.body.confirmPassword) 
        return res.status(400).json({ message: "Password dosen't match!" });

        User.updateOne({ username: username }, {password:req.body.newPassword}).then(data => {

            console.log(data)
            return res.status(200).json({ message: "Password changed successfully" });

        }).catch(error=>{
            return res.status(500).json({ message: error.message});
        });
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}



module.exports = {pSignup, pLogin, changePassword, getUserName};