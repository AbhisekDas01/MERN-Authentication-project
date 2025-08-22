import User from '../models/User.model.js';

/**
 * Get User Data Function
 * Retrieves user information for authenticated users
 * @param {Object} req - Express request object containing userId from middleware
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data (name, verification status)
 */
export const getUserData = async (req ,res) => {

    const {userId} = req;

    try {

        const user = await User.findById(userId);

        if(!user){
            return res.json({
                success: false,
                message: "User not found!"
            })
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}