const newsRoutes = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { verifyToken, verifyAPIKey } = require('../middleware/authJWT');
const { getNews, searchNews } = require('../service');

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());

newsRoutes.get('/preferences', verifyToken, (req, res) => {
    let readPath = path.join(__dirname, '..', '/db/index.json');
    let userData = JSON.parse(fs.readFileSync(readPath, { encoding: "utf8", flag: "r" }));
    let userFound = userData.find((user) => user.id === req.userId);
    if (!userFound) {
        return res.status(404).send({ message: "User not found" });
    } else {
        return res.status(200).send({ message: "Fetched News Preferences Successfully", data: userFound.preferences });
    }
});

newsRoutes.put('/preferences', verifyToken, (req, res) => {
    let readPath = path.join(__dirname, '..', '/db/index.json');
    let userData = JSON.parse(fs.readFileSync(readPath, { encoding: "utf8", flag: "r" }));
    let userFound = userData.find((user) => user.id === req.userId);
    if (!userFound) {
        return res.status(404).send({ message: "User not found" });
    } else {
        let writePath = path.join(__dirname, '..', '/db/index.json');
        let userDataList = JSON.parse(JSON.stringify(userData));
        userDataList.find((user) => user.id === req.userId).preferences = req.body.preferences;
        fs.writeFileSync(writePath, JSON.stringify(userDataList), { encoding: "utf8", flag: "w" });
        return res.status(200).send({ message: "Updated News Preferences Successfully", data: userDataList.find((user) => user.id === req.userId) });
    }
});

newsRoutes.get('/news', (verifyAPIKey, verifyToken), async (req, res) => {
    let readPath = path.join(__dirname, '..', '/db/index.json');
    let userData = JSON.parse(fs.readFileSync(readPath, { encoding: "utf8", flag: "r" }));
    let userFound = userData.find((user) => user.id === req.userId);
    console.log("userFound", userFound)
    if (!userFound) {
        return res.status(404).send({ message: "User not found" });
    } else {
        let userDataList = JSON.parse(JSON.stringify(userData));
        const userPreferences = userDataList.find((user) => user.id === req.userId).preferences
        const news = await getNews(userPreferences)

        return res.status(200).send({ message: "Fetched News Successfully", data: news });
    }
});

newsRoutes.get('/news/search/:keyword', (verifyAPIKey, verifyToken), async (req, res) => {
    let keyword = req.params.keyword;
    const news = await searchNews(keyword);
    return res.status(200).send({ message: "Fetched News Successfully", data: news });
});
module.exports = newsRoutes;