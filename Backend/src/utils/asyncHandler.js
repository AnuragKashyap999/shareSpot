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






// registerUser
//       │
//       ▼
// asyncHandler(registerUser)
//       │
//       ▼
// Returns a NEW function

// (req, res, next) => {
//     Promise.resolve(
//         registerUser(req, res, next)
//     ).catch(...)
// }

//       │
//       ▼
// Express receives this function
//       │
//       ▼
// Express calls it with:
// (req, res, next)
