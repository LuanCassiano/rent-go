require('dotenv').config({
    path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env"
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

class App {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
    }

    routes() {
        this.express.use(require('./routes'));
    }
}

module.exports = new App().express