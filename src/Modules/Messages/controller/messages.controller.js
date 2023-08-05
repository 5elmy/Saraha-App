import messageModel from "../../../../DB/models/messages.model.js";
import userModel from "../../../../DB/models/user.model.js";

export const getMessages =async(req,res,next)=>
{
  
    
    const userMessages = await messageModel.find({recieverId:req.user._id})
    return res.json({message:"user Message " ,Messages:userMessages})
}

export const deleteMessage =async(req,res,next)=>
{ 
    const {id}= req.params
 console.log(req.user._id)
    const message = await messageModel.deleteOne({recieverId : req.user._id , _id:id})
    return message.deletedCount? res.json({message:"user Message " ,Messages:message}) :
                              next(new Error('invalid userId or messageId'))
}

//send message
export const sendMessage =async (req,res,next)=>
{
    const{recieverId}= req.params;
    const {message}=req.body;
    if(!message)
    {
        return next(new Error('message is required '))
    }
    console .log({message , recieverId})
    const user =  await userModel.findById(recieverId)
    //console.log(user)
    if(!user) 
    {
     return next(new Error('this user not register')) 
    }
    const createMessage= await messageModel.create({message,recieverId})
   return res.json({message:"Done",message:createMessage})
}

