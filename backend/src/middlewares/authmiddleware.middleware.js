
import jwt from 'jsonwebtoken'
import apiError from '../utils/apiError.js'
const authMiddleware =async(req,res,next) =>{
    const token = req.headers.Authorization?.split(" ")[1] || req.cookies.Authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json(new apiError(401 , {tokenProvided:"null"},"you are not authorized becuase you don't have a token."))
    }

    const decodedToken = jwt.verify(token , process.env.JWT_TOKEN_SECRET)

    if(decodedToken){
        req.user = decodedToken
        next()
    }else{
        throw new apiError(401 , "you are not authorized becuase you don't have a token.")
    }
}

export  {authMiddleware}