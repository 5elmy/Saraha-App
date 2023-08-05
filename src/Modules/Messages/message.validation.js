import Joi from "joi";



export const sendmessagevalidation = {
    body:Joi.object({
        message:Joi.string().required().min(3).max(1500).required()
    }).required(),
    params:Joi.object({
        recieverId:Joi.string().min(24).max(24).required()
    }).required()
}

export const deleteMessageValidation = {
    params:Joi.object({
       id: Joi.string().hex().min(24).max(24)
    }).required()
}