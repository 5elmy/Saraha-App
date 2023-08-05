import Joi from "joi";


export const updateUserValidation = {
    body:Joi.object({
        userName:Joi.string().pattern(/^[A-Za-z]{1,30}$/).required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
        cpassword:Joi.string().valid(Joi.ref("password")),
        gender:Joi.string().valid("male","female"),
        age:Joi.number().min(18).max(85),
        status:Joi.string().valid("offline","online","blocked"),
        role:Joi.string().valid("user","admin"),
    }).required()
} 