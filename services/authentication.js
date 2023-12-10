const JWT = require("jsonwebtoken");

const secret = "Andyp3";
function createTokenForUser (user){
    const payLoad = {
        _id : user._id,
        fullName : user.fullName,
        email : user.email,
        profileImageUrl : user.profileImageUrl,
        role : user.role,
    };
    const token = JWT.sign(payLoad, secret);
    return token;
}

function validateToken (token){
    const payLoad = JWT.verify(token,secret);
    return payLoad;
}

module.exports = {
    createTokenForUser,
    validateToken,
}