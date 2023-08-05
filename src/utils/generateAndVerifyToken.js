import jwt from 'jsonwebtoken'


export const generateToken = ({ payload={} , 
                         signture=process.env.SIGNATURE ,
                         expiresIn=60*60})=>{
  const token = jwt.sign(payload,signture,{expiresIn});
  return token
} 


export const  verifyToken =({token , signture=process.env.SIGNATURE}={})=>{
// console.log(`in func =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>${token}`)
  const decoded= jwt.verify(token,signture)
  return decoded
}

