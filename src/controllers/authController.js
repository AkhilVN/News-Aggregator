const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require("fs");
const path = require("path");
const userData = require('../db/index.json');
const validator = require('../helpers/validators');
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {
    console.log(req.body);
    const uuid = uuidv4();
    const user = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        id: uuid
    };

    if (validator.ValidateUser(user, userData).status === 201) {
        let writePath = path.join(__dirname, '..', '/db/index.json');
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        let userDataList = JSON.parse(JSON.stringify(userData));
        userDataList.push({ ...user, token });
        fs.writeFileSync(writePath, JSON.stringify(userDataList), { encoding: "utf8", flag: "w" });
        return res.status(201).send({
            auth: true, token: token, message: "User registered successfully", data: user
        })
    } else {
        return res.status(400).send({
            auth: false, token: null, message: "User already exists"
        })
    }
}

const login = async (req, res) => {
    console.log(userData);
    let userFound = userData.find((user) => user.email === req.body.email);
    if (!userFound) {
        return res.status(404).send({ message: "User not found" });
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, userFound.password);
    if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: userFound.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    let userDataList = JSON.parse(JSON.stringify(userData));
    userDataList.find((user) => user.email === req.body.email).token = token;
    userFound.token = token;
    let writePath = path.join(__dirname, '..', '/db/index.json');
    fs.writeFileSync(writePath, JSON.stringify(userDataList), { encoding: "utf8", flag: "w" });
    return res.status(200).send({
        auth: true, token, message: "User logged in successfully", data: { ...userFound }
    })
}

module.exports = { register, login };