
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/env.js';

/**
 * User Authentication Middleware
 * Verifies JWT token from cookies and extracts user ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object  
 * @param {Function} next - Express next middleware function
 * @returns {void} - Calls next() on success or sends error response
 */
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