const JWT = require('jsonwebtoken');
const SECRETKEY = 'userAuthentication';


const auth = (request, response, next) => {
    try{
        let token = request.headers['authorization'];
        
        if(token){
            token = token.split(" ")[1];
            let user = JWT.verify(token,SECRETKEY);
            request.userId = user.id;
        }else{
            return response.status(401).json({success: false, status:401, message:"Unauthorized User"});
        }
        next();
    }catch(error){
        return response.status(401).json({success: false, status:401, message:"Unauthorized User"});
    }
}

module.exports = auth;