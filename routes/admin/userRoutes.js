const express = require('express');
const userRouter = express.Router();
const {validationResult} = express('express-validator');
const {userValidation} = require('../../Validations/admin/userValidations');
const {index, store, show, update, destroy} = require('../../Controllers/Admin/UserController');
const auth = require('../../middleware/AuthMiddleware');

userRouter.get('/', auth, index);
userRouter.post('/', auth, store);
userRouter.get('/:id', auth, show);
userRouter.put('/:id', auth, update);
userRouter.delete('/:id', auth, destroy);

module.exports = userRouter;