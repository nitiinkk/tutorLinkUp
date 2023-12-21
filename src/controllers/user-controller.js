import UserService from '../services/user-service.js';
const userService = new UserService();

export const enrollUser = async (req, res, next) => {
    try {
        console.log(req.userDetails, " decode")
        let enrollDetails = await userService.enroll({
            name: req.body.name,
            gender: req.body.gender,
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            class_uuid: req.body.class_uuid,
        });
        const response = req.userDetails;
        enrollDetails = {...enrollDetails, ...response};
        return res.json({
            success: true,
            message: "User Enrolled succesfully",
            data: enrollDetails,
            err: {}
        });
    } catch (error) {
        next(error);
    }
}

export const createStudent = async (req, res, next) => {
    try {
        const userDetails = await userService.create({
            name: req.body.name,
            gender: req.body.gender,
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            class_uuid: req.body.class_uuid
        });
        req.userDetails = userDetails;
        console.log(req.userDetails, " decode1")
        next();
    } catch (error) {
        next(error);
    }
}

export const deleteStudent = async (req, res, next) => {
    try {
        await userService.delete({username: req.params.username});
        return res.json({
            success: true,
            message: `User ${req.params.username} Deleted succesfully`,
            data: [],
            err: {}
        });
    } catch (error) {
        console.log(error, " line 39");
        next(error);
    }
}

export const updateStudent = async (req, res, next) => {
    try {
        const userDetails = await userService.update({
            username: req.params.username,
            avatar_state: req.body.avatar_state
        });
        return res.json({
            success: true,
            message: "User details updated succesfully",
            data: userDetails,
            err: {}
        });
    } catch (error) {
        next(error);
    }
}