const express = require('express');
const userModel = require('../../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRETKEY = 'userAuthentication';



const signin = async (request, response) =>{
    try{
        const {email,password} = request.body;
    let existingUser = await userModel.findOne({email: email});
    if(!existingUser){
        return response.status(404).json({success:false, status:400, message : "User Not Found"});
    }
    let passwordMatch = await bcrypt.compare(password, existingUser.password);
    if(!passwordMatch){
        return response.status(400).json({success:true, status:400, message:"Invalid credentials"});
    }

    let token = JWT.sign({email:existingUser.email, id : existingUser._id}, SECRETKEY);
    return response.status(200).json({success:true, status:200, message:"Login Successfully", userData : existingUser, token : token});
    }catch(error){
        return response.status(500).json({success:false, status:500, message:"Internal Server error",error:error.message});
    }
}


module.exports = {signin}