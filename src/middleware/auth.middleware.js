//import { AsyncHandler } from "../utils/ErrorHandling.js";


import userModel from "../../DB/models/user.model.js";
import { verifyToken } from "../utils/generateAndVerifyToken.js";


const auth= async(req,res,next)=>{
    const authorization = req.headers.authorization
    //console.log(authorization);
    if(!authorization)
    {
        return next(new Error('Authorization is required'))
    }
    if(!authorization.startsWith('prof '))
    {
     return next(new Error('in-vaild authorization'))
    }
    const token = authorization.split("prof ")[1];
   // console.log(token)
   if(!token)
    {
        return next(new Error('token is required'))
    }
    
     const decoded = verifyToken({token})
     //console.log(decoded)
     if(!decoded._id || !decoded.isloggedIn)
     {
        return next(new Error('in-valid token payload...'))
     }
     const authuser = await userModel.findById(decoded._id)
    // console.log(authuser)
     if(!authuser)
     {
        return next(new Error('not register account..'))
     }
     req.user = authuser;
     return next()
    
    }

export default auth