

 export const AsyncHandler= (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>{
            return   next(new Error(err)) //res.json({message:"catch error " ,err, stack:err.stack}) //next(new Error(err)) 
        })
    }
}

export const globalhandling= (err,req,res,next)=>{
        if(err)
        {
            return res.json({message:err.message ,err})
        }
    }
