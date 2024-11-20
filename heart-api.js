const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require("cors");
const moment = require('moment');

dotenv.config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

moment.locale('id');
const app = express();
TZ = 'Asia/Jakarta'
const corsOptions = {
    origin: '*',
    credentials: true,
    // access-control-allow-credentials:true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
app.options('*', cors());

const db = require("./app/models/index.model");
db.sequelize.sync()
// db.sequelize.sync({ force: true })
// db.sequelize.sync({ logging: console.log })
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
// db.user.sync(
//     { force: true, logging: console.log }
// )
// db.historyCare.sync(
//     { force: true, logging: console.log }
// )
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("./app/routes/user/auth.routes")(app);
require("./app/routes/user/user.routes")(app);
require("./app/routes/user/drug.routes")(app);
require("./app/routes/user/home.routes")(app);
require("./app/routes/user/articles.routes")(app);
require("./app/routes/user/region.routes")(app);
require("./app/routes/user/officer.routes")(app);
require("./app/routes/user/history_care.routes")(app);
require("./app/routes/user/home_care.routes")(app);
require("./app/routes/user/history.routes")(app);

require("./app/routes/admin/auth.routes")(app);
require("./app/routes/admin/user.routes")(app);
require("./app/routes/admin/banner.routes")(app);
require("./app/routes/admin/articles.routes")(app);
require("./app/routes/admin/officer.routes")(app);
require("./app/routes/admin/symptom.routes")(app);


app.get("/", (req, res) => {
    res.json({ message: "Welcome to MyHeart.id API " });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server " + process.env.ENVIRONMENT + " is running on port " + PORT);
    console.log(new Date().toString());
});