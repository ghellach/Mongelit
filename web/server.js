const express = require('express');
const router = require("./routes");
const cors = require('cors');
const morgan = require('morgan');

function initServer() {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"))

    app.get("/", (req, res) => {
        res.send("ok");
    });

    app.use("/", router);

    app.listen(5001);




}

module.exports = initServer;