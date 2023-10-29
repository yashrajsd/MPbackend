const jwt = require('jsonwebtoken');
const User = require('../models/User')
require('dotenv').config();
require('cookie-parser')

// auth 
exports.auth=(req, res, next)=>{
    try {
        // const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "")
        let token =  req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success:false,
                messege:"please provide token"
            })
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user= payload
        } catch (error) {
            return res.status(401).json({
                success:false,
                messege:"token is invalid"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            messege:"Something went wrong while verifying the token"
        })
    }
}