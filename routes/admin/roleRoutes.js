const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
const {roleValidator } = require('../../Validations/admin/roleValidations');
const Role = require('../../models/Role');
const auth = require('../../middleware/AuthMiddleware');

// create new role api
router.post("/",auth, roleValidator , async(request, response) =>{
    // validation
    const validationError = validationResult(request);
    if(!validationError.isEmpty()){
        // format error 
        const formatedError = validationError.array().reduce((acc, err) =>{
            acc[err.path] = err.msg; // Assign error message to its field key
            return acc;
        }, {});

        // Send the response with a key for validation errors
        return response.status(400).json({
            success: false,
            errors: formatedError,
        });
    }

    try{
        const role = new Role({
            name : request.body.name,
            slug : request.body.slug,
            description : request.body.description,
            permission : request.body.permission,
            is_active : request.body.is_active,
            priority : request.body.priority,
        });
        await role.save();
        response.status(201).json({message : "Role Created Successfully",role});

    }catch(error){
        response.status(500).json({message:"Server error",errors: error.message})
    }
});

// get list of role
router.get("/",auth, async (request, response) =>{
    try{
        const roles = await Role.find().where('is_active').equals(1);
    response.status(200).json({success:true, status:200,  roles});
    }catch(error){
        response.status(500).json({ message: "Server error", error: error.message })
    }
});

// find data by id
router.get("/:id",auth, async (request, response) =>{
    let id = request.params.id;
   try{
    var detail = await Role.findById(id).lean();
    if (detail) {
        let safeDetail = JSON.parse(JSON.stringify(detail));
        return response.status(200).json(safeDetail); 
    } else {
        return response.status(404).json({ message: 'Item not found' }); 
    }
   }catch(error){
    return response.status(500).json({ message: 'Internal server error', error: error.message })
   }
});

// update api
router.put("/:id", auth, roleValidator, async (request, response) =>{
    let id = request.params.id;
    try{
        // validation
        let validateError = validationResult(request);
        if(!validateError.isEmpty()){
            let formatedErrorValidation = validateError.array().reduce((acc, err) =>{
                acc[err.path] = err.msg;
                return acc;
            },{});
            return response.status(400).json({
                success : false,
                error: formatedErrorValidation
            });
        }
        // get role data
        let roleData = await Role.findById(id);
        if(!roleData){
            return response.status(404).json({ message: 'Item not found' });
        }
        // update Query
        if(roleData.name) roleData.name = request.body.name;
        if(roleData.slug) roleData.slug = request.body.slug;
        if(roleData.description) roleData.description = request.body.description;
        if(roleData.is_active) roleData.is_active = request.body.is_active;
        if(roleData.priority) roleData.priority = request.body.priority;
        let updatedRole = await roleData.save();
        if(updatedRole){
            return response.status(200).json({message:"Role Updated Successfully"});
        }

    }catch(error){
        return response.status(500).json({message : "Internal server error", error:error.message});
    }
});

// delete api
router.delete("/:id",auth,  async (request, response) =>{
    let id = request.params.id;
    try{
        let result = await Role.findByIdAndDelete(id);
        if(result){
            return response.status(200).json({ message: 'Role deleted successfully' })
        }else{
            return response.status(404).json({ message: 'Item not found' });
        }
    }catch(error){
        return response.status(500).json({"message":"Internal Server Error", error:error.message});
    }
});

// change status api
router.get("/changeStatus/:id", auth, async (request, response)=>{
    let id = request.params.id;
    try{
        let roleData = await Role.findById(id);
        var status = 0;
        if(roleData.is_active == 1){
            status = 0;
        }else{
            status = 1; 
        }
        roleData.is_active = status;
        let roleStatusChanges = await roleData.save();
        if(roleStatusChanges){
            return response.status(200).json({message:"Role Status has been changes"});
        }
    }catch(error){
        return response.status(500).json({message:"Internal Server Error",error : error.message});
    }
}) ;

module.exports = router;



