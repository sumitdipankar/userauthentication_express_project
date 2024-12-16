const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const authRouter = express.Router();
const {signin} = require('../../Controllers/Admin/AuthController');

authRouter.post("/admin/signin", signin);


module.exports = authRouter;

