
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/env.js';


export const userAuth = async (req , res , next) => {

    try {
        
        const {token} = req.cookies;

        if(!token){
            return res.json({
                success: false,
                message: "Not authorized!"
            })
        }

        const tokenDecode = jwt.verify(token , JWT_SECRET);

        if(tokenDecode){
            req.userId = tokenDecode.id;
            
        } else{
            return res.json({
                success: false,
                message: "Not authorized! Login again"
            })
        }

        next();


    } catch (error) {
        
        return res.json({
            success: false,
            message: error.message
        })
    }

}