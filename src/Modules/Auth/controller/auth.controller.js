
import userModel from "../../../../DB/models/user.model.js";
import sendEmail from "../../../utils/confirmEmail.js";
import { AsyncHandler } from "../../../utils/ErrorHandling.js";
import { generateToken, verifyToken } from "../../../utils/generateAndVerifyToken.js";

import {  compare, hash } from "../../../utils/Hash&Compare.js";

//get module
export const authModule = async (reg, res, next) => {
  return res.json({ message: "auth moduele" });
};

//signup
export const signUp = AsyncHandler(async (req, res, next) => {

    const { userName, email, password,age } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return next(new Error('Email Areadly Exist '))
    }
     //Start confirm Email in signup 

     const token = generateToken({payload:{email} , signture:process.env.EMAIL_SIGNTURE ,expiresIn:60*5})
     const link = `http://localhost:5000/auth/confirmemail/${token}`

     
     const reToken = generateToken({payload:{email} , signture:process.env.EMAIL_SIGNTURE ,expiresIn:60*60*24*30})
     const reLink = `http://localhost:5000/auth/newconfirmemail/${reToken}`

    const  html= `<a href=${link}> click here to Comfirm Your  Email now .  </a>
     <br/><br/> <br/><br/> <br/>
     <a href=${reLink}> Request New Email .` 
     const info = await sendEmail({to:email , subject:"confirm email" , html})
     if(!info)
     {
      return next(new Error('Rejected Email'))
     }

      //End confirm Email

    const hashPassword = hash({ plaintext: password });
    const createUser = await userModel.create({
      userName,
      email,
      password: hashPassword,
      age
    });
    return res.json({
      message: "User added successfully",
      UserID: createUser._id,
    });
 
});

//confirm email

export const confirmEmail =AsyncHandler(async(req,res,next)=>{

  const token = req.params.token
  const {email} = verifyToken({token:token , signture:process.env.EMAIL_SIGNTURE})
  console.log(email);
  const user = await userModel.updateOne({email :email, confirmEmail:false  } ,{confirmEmail:true})
  return user.modifiedCount ? res.status(200).redirect('https://linkitqa.netlify.app/#/login')
                            : next(new Error('not register account'))
})
export const newConfirmEmail =AsyncHandler(async(req,res,next)=>{

  const token = req.params.token
  const {email} = verifyToken({token:token , signture:process.env.EMAIL_SIGNTURE})
  const newToken = generateToken({payload:{email} , signture:process.env.EMAIL_SIGNTURE ,expiresIn:60*2})
     const link = `http://localhost:5000/auth/confirmemail/${newToken}`

     
    // const reToken = generateToken({payload:{email} , signture:process.env.EMAIL_SIGNTURE ,expiresIn:60*60*24*30})
     const reLink = `http://localhost:5000/auth/newconfirmemail/${token}`

    const  html= `<a href=${link}> click here to Comfirm Your  Email now .  </a>
     <br/><br/> <br/><br/> <br/>
     <a href=${reLink}> Request New Email .` 
     const info = await sendEmail({to:email , subject:"confirm email" , html})
     if(!info)
     {
      return next(new Error('Rejected Email'))
     }

     return res.status(200).send("Done please check your email")
 
})






// //login
export const logIn =AsyncHandler(async (req,res,next)=>{

  const { email,password} = req.body;
 // console.log({email,password});
  const user= await userModel.findOne({email});
  //console.log(user.password)
  if(!user)
  { return next(new Error('In-Vaild email'));}
   const match =compare({plaintext:password , hashValue:user.password})

   //console.log(match)
   if(!match)
   {
    return next(new Error('In-Vaild Password'))
   }
   const token = generateToken({payload:{_id:user._id, isloggedIn:true ,email:user.email},expiresIn:60*60*24})
   user.status="online"
   await user.save()
    return  res.json({message:'Success..' ,access_token:token})
})

