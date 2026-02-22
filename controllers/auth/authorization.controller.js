import jwt from "jsonwebtoken"
import Users from "../../models/user/user.model.js";
import AppError from "../appError.js";

const cookieName = process.env.AUTH_COOKIE_NAME || "purseToken";

async function requireAuth(req, res, next) {
    try {
        const cookieToken = req.cookies?.[cookieName];
        const token = cookieToken;

        if (!token) {
            throw new AppError('Unauthorized', 401)
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findOne({ email: decodedToken.email, activeSessions: decodedToken.jti });

        if (!user) {
            throw new AppError('Unauthorized', 401)
        }
        
        req.user = user;
        req.jti = decodedToken.jti;

        next();

    }
    catch (error) {
        next(new AppError('Unauthorized', 401))
    }
};

function getAuth(req, res) {
    res.status(200).json({ message: 'Authorized' })
}

export { requireAuth, getAuth }
