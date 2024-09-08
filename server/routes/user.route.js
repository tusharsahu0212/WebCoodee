const {pSignup, pLogin, changePassword, getUserName} = require("../controllers/user.controller");

module.exports = (app) => {

    //signUp
    app.post('/signUp', pSignup);

    //login
    app.post('/login', pLogin);

    //get user name
    app.get('/getUserName',getUserName)
    
    //chage password
    app.patch('/changePassword',changePassword)
};