const jwt = require('jsonwebtoken');
const generateTokenAndSetCookie = (res, user_id, role) => {
    const token = jwt.sign({user_id, role}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7d'
    });

    // console.log(token);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "strict",
        maxAge: 7*24*60*60*1000
    });
    // console.log('Cookie set successfully');
    
    return token;
}
module.exports = { generateTokenAndSetCookie };

