const express = require('express');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true,
        trim : true,
    },
    lname : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    role_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required : true,
        trim : true,
    },
    is_active : {
        type : Boolean,
        required : false,
        trim : true
    },
    deleted_at : {
        type : Date,
        default : null,
        required : false,
        trim : true
    },
    created_at : {
        type : Date,
        default : Date.now(),
        required : false,
        trim : true
    },
    updated_at : {
        type : Date,
        default : Date.now(),
        required : false,
        trim : true
    }
});

const User = mongoose.model('User',UserSchema);
module.exports = User;