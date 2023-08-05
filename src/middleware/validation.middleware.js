const methods= ["body","params","query","file","headers"];

export const validation = (schema)=>{

  return   (req,res,next)=>{
    const validationErr= []
        
        methods.forEach(key=>{
          ///  console.log(`key is ${key}`); //params query file body headers
            if(schema[key])
            {
                //console.log(key)
                const  validationResult= schema[key].validate(req[key],{abortEarly:false})
                 if(validationResult?.error)
                  {
                    validationErr.push(validationResult.error.details)
                  }

            }
        })

        if(validationErr.length>0)
        {
           return res.json({message:"validation error" ,validationErr}) //validationErr.push(validationErr)
        }else 
        {
            next()
        }
    }
}