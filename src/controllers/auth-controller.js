import UserService from '../services/user-service.js';
const userService = new UserService();

export const login = async (req, res, next) => {
    try {
        console.log(req.body.username);
        const userDetails = await userService.login({
            username: req.body.username
        });
        return res.json({
            success: true,
            message: "User details retrieved succesfully",
            data: userDetails,
            err: {}
        });
    } catch (error) {
        next(error);
    }
}