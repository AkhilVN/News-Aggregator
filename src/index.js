const express = require('express');
const bodyParser = require('body-parser');
const routes = express.Router();
const cors = require('cors');
require('dotenv').config();
const newsRoutes = require('./routes/news.js');

const app = express();
const PORT = 3000;

const { login, register } = require('./controllers/authController');

app.use(cors());
app.use(routes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

routes.get('/', (req, res) => {
    res.send('Hello World!');
});

routes.post("/login", login)

routes.post("/register", register)

routes.use("/", newsRoutes);


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server running at port ${PORT}`);
})

module.exports = app;