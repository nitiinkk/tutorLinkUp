import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRETKEY;

export const validateJwt = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
            success: false
        });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized user',
                reason: err,
                success: false
            })
        }

        req.authorisedUser = decoded.username;
        req.authorisedRole = decoded.role;
        next();
    });
}

export const isTutor = (req, res, next) => {
    if (req.authorisedRole !== "tutor") {
        return res.status(403).json({
            message: 'Insufficient Permission to create/enroll Students',
            success: false
        });
    }
    next();
}