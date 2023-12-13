import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const payLoad = jwt.verify(req._id, process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(404).send(error.message);
    }
};

export default auth;
