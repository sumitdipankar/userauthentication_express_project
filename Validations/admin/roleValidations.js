const {check, validationResult } = require('express-validator');


exports.roleValidator = [
    check("name" , "Name field is required").not().isEmpty(),
    // check("name", "This Name is already taken").not().isEmpty().isUnique({model : 'Role', field :'name'}),
    check("slug" , "Name field is required").not().isEmpty(),
    // check("slug", "This Name is already taken").not().isEmpty().isUnique({model : 'Role', field :'name'}),
];


