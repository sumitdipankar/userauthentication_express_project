const express = require('express');
const userModel = require('../../models/User');
const {validationResult} = require('express-validator');
const {userAddValidation, userUpdateValidation} = require("../../Validations/admin/userValidations");
const User = require('../../models/User');

const index = async (request, response) =>{
    try{
        let users = await userModel.find().where({is_active:1}).populate('role_id');
        return response.status(200).json({success:true, status:200, message:"users list", data:users});
    }catch(error){
        return response.status(500).json({success:true, status:500, error:error.message});
    }
}

const store = async (request, response) =>{
    await Promise.all(userAddValidation().map((validation) => validation.run(request)));
    const validationError = validationResult(request);
  if (!validationError.isEmpty()) {
    const formattedErrors = validationError.array().reduce((acc, err) =>{
        acc[err.path] = err.msg; // Assign error message to its field key
        return acc;
    }, {});
  
      return response.status(400).json({success:false, status:400, errors: formattedErrors });
  }
    let payload = {fname, lname, email, password, role_id, is_active} = request.body;
    try{
        const newUser = await userModel.create({
            fname,
            lname,
            email,
            password,
            role_id,
            is_active,
          });
          return response.status(201).json({
            success:true,
            status:201,
            message: 'User created successfully!',
            data: newUser,
          });
    }catch(error){
        return response.status(500).json({success:false, status:500, message:"Internal server eroro",error:error.message});
    }
}


const show = async (request, response) =>{
   try{
        let id = request.params.id;
        let details = await userModel.findById(id);
        return response.status(200).json({success:true, status:200, message:"user details", data:details});
   }catch(error){
    return response.status(500).json({success:false, status:500, message:"Internal Server Error"});
   }
}

const update = async (request, response) =>{
    await Promise.all(userUpdateValidation().map((validation) => validation.run(request)));
    const validationError = validationResult(request);
  if (!validationError.isEmpty()) {
    const formattedErrors = validationError.array().reduce((acc, err) =>{
        acc[err.path] = err.msg; // Assign error message to its field key
        return acc;
    }, {});
      return response.status(400).json({success:false, status:400, errors: formattedErrors });
  }
  let { fname, lname, email, password, role_id, is_active } = request.body;
  let payload = { fname, lname, email, password, role_id, is_active };
    try{
        let id = request.params.id;
        let users = await userModel.findById(id);
        if(users != ''){
            const updatedUser = await userModel.findByIdAndUpdate(id, payload, { new: true });
              return response.status(200).json({
                success:true,
                status:200,
                message: 'User updated successfully!',
                data: updatedUser,
              });
        }else{
            return response.status(200).json({
                success:true,
                status:200,
                message: 'User Not Found!',
                data: updatedUser,
            });
        }
        
    }catch(error){
        return response.status(500).json({success:false, status:500, message:"Internal server eroro",error:error.message});
    }
}

const destroy = async (request, response) =>{
    try{
        let id = request.params.id;
        let user = await userModel.findById(id);
        if (!user) {
            return response.status(404).json({
              success: false,
              status: 404,
              message: 'User not found!',
              data: null,
            });
          }
          await userModel.findByIdAndDelete(id);
        return response.status(200).json({success:true, status:200, message:"user deleted successfully", data:[]});
   }catch(error){
    return response.status(500).json({success:false, status:500, message:"Internal Server Error"});
   }
}


module.exports = {index, store, show, update, destroy};
