const asyncHandler =(reqestHandler)=>{
    return (req,res,next)
    Promise
    .resolve(reqestHandler(req,res,next))
    .catch(err=>next(err))

} 


// shortHand 

// const asynh =(func)=>
//     (req,fres,next)=>{
//         Promise
//         .resolve(func(res,res,next))
//         .catch(err=>next(err))
//     }


export default asyncHandler  




