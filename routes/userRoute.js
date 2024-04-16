const express = require('express');
const userRouter = express.Router();
const auth = require('../middleware/auth.js')
const userController = require('../controller/userController.js');

userRouter.route('/').get(userController.getAllUser);
// userRouter.route('/').post(auth.Auth,userController.createUser);
userRouter.route('/:id').get(userController.getUserById);
userRouter.route('/:id').post(userController.updateUser);
userRouter.route('/:id').put(userController.setStatusUser);



module.exports = userRouter;