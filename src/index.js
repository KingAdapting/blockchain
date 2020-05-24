"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const httpPort = parseInt(process.env.HTTP_PORT) || 3001;
const initHttpServer = (myHttpPort) => {
    const app = express();
    app.use(bodyParser.json());
    app.get('/check', (request, response) => {
        response.send('Check success');
    });
};
initHttpServer(httpPort);
//# sourceMappingURL=index.js.map