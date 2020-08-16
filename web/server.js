const express = require('express');
const router = require("./routes");
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

function initServer(config) {
    const app = express();

    app.use(express.json());
    app.use(cors());
    if(process.env.ENV === "dev") app.use(morgan("dev"));

    app.get("/", (req, res) => {
        res.send("hey mongo");
    });

    app.use("/", router);

    app.listen(config.port);




}

dotenv.config({path:"../.env"});

initServer({port : process.env.APP_PORT});

module.exports = initServer;