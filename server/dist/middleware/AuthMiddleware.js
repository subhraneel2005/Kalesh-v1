import jwt from "jsonwebtoken";
//401 = unauthorised user
//403 = forbidden access
//500 = internal server error
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === null || authHeader === undefined) {
        return res.status(401).json({ status: 401, message: "You are not authorised" });
    }
    const token = authHeader.split(" ")[1];
    //Verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ status: 401, message: "You are not authorised" });
        }
        req.user = user;
        next();
    });
};
export default authMiddleware;
