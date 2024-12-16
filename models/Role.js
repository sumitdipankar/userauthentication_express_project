const { json } = require('express');
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    slug :{
        type : String,
        unique : true,
        trim : true,
        required : true
    },
    description : {
        type : String,
        trim : true,
        required : false,
        default : "No description added"
    },
    permission : {
        type : String,
        required : false
    },
    is_active :{
        type : Boolean,
        required : false
    },
    priority : {
        type : String,
        rquired : false
    },
    deleted_at : {
        type : Date,
        default : null
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    updated_at : {
        type :Date,
        default : Date.now
    }

    
});

// module.export = mongoose.model('Role',RoleSchema);
const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;

