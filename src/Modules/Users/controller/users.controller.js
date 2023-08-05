import userModel from "../../../../DB/models/user.model.js";
//import { hash } from "../../../utils/Hash&Compare.js";

export const userModule = async (req, res, next) => {
  return res.json({ message: "user module" });
};

export const updateUser= async (req, res, next) => {
  const { userName  , gender  }= req.body; //, age
 //const hashpassword=hash({plaintext:password})
   console.log({ userName  , gender })
   const  update_user = await userModel.findByIdAndUpdate({_id:req.user._id},{userName,gender},{new:true})
   console.log(`Update= {${update_user} }`)
   return res.json({ message:"Done",update_user });
};
export const deleteUser=async (req,res,next)=>{
  const delete_user= await userModel.findByIdAndDelete(req.user._id)
  console.log(delete_user)
  return res.json({ message:"Deleted is Done",Delete_User: delete_user });


}
