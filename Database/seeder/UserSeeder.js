const mongoose = require('mongoose');
const User = require('../../models/User');
const mongoConnectDB = require('../../config/db');
const bcrypt = require('bcrypt');


const userSeeder = async () =>{
    try{
        mongoConnectDB();
        const users = [
            {
                fname : "Super",
                lname : "Admin",
                email : "super@admin.com",
                password : await bcrypt.hash("Admin@123#", 20),
                role_id : "674ad6a3ed37cf7778a5c769",
                is_active : 1,
            }
        ];
        await User.insertMany(users);
        console.log("UserSeeder Sedding Successfully");
        
    }catch(error){
        console.error("Error seeding database:", error);
        mongoose.disconnect();
    }
}

userSeeder();