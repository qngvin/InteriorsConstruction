const express = require('express');
const accountRouter = express.Router();
const accountController = require('../controller/accountController.js');
const auth  = require('../middleware/auth.js')


accountRouter.route('/register').post(accountController.register);
accountRouter.route('/login').post(accountController.login);
accountRouter.route('/changePassword').post(auth.Auth,accountController.changePassword);



module.exports = accountRouter;