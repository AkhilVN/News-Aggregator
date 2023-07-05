const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        console.log("erty", decoded)
        if (!decoded.userId) {
            return res.status(404).send({ message: "User not found" });
        }
        req.userId = decoded.userId;
        next();
    });
}

const verifyAPIKey = async (req, res, next) => {
    const apiKey = req.headers.apikey;
    if (!apiKey) {
        return res.status(403).send({ message: "No api key provided!" });
    }
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).send({ message: "Unauthorized!" });
    }
    next();
}

module.exports = { verifyToken, verifyAPIKey };