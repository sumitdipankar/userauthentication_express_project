const {body} = require('express-validator');

const userAddValidation = () =>{
    return [
        body('fname').notEmpty().withMessage("First Name is required"),
        body('lname').notEmpty().withMessage("Last Name is required"),
        body('email').isEmail().withMessage("Email is required").bail()
        .custom(async (email) => {
        //     const existingUser = await User.findOne({ email });
        //     if (existingUser) {
        //       throw new Error('Email already exists');
        //     }
          }),
        body('password').notEmpty().withMessage("Password is required").bail()
        .isLength({min:8}).withMessage("Password must be at least 8 character"),
        body('role_id').notEmpty().withMessage("Role is required"),
        body('is_active').isBoolean().withMessage("Status is required"),
    ];
}

const userUpdateValidation = () =>{
    return [
        body('fname').optional().notEmpty().withMessage("First Name is required"),
        body('lname').optional().notEmpty().withMessage("Last Name is required"),
        body('email').optional().isEmail().withMessage("Email is required"),
        body('password').optional().notEmpty().withMessage("Password is required")
        .isLength({min:8}).withMessage("Password must be at least 8 character"),
        body('role_id').optional().notEmpty().withMessage("Role is required"),
        body('is_active').optional().isBoolean().withMessage("Status is required"),
    ]
}

module.exports = {userAddValidation, userUpdateValidation};