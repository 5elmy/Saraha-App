import Joi from "joi";


export const signupSchema = {
    body: Joi.object({
        userName:Joi.string().pattern(/^[A-Za-z]{1,30}$/).required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
        cpassword:Joi.string().valid(Joi.ref("password")).required(),
        gender:Joi.string().valid("male","female"),
        age:Joi.number().min(18).max(85),
        status:Joi.string().valid("offline","online","blocked"),
        role:Joi.string().valid("user","admin"),
        
    }).required()
}

export const loginSchema = {
    body: Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required()     
    }).required()
}