import * as bodyParser from 'body-parser';
import * as express from 'express';

const httpPort: number = parseInt(process.env.HTTP_PORT) || 3001;

const initHttpServer = (myHttpPort: number) => {
    const app = express();
    app.use(bodyParser.json());

    app.get('/check', (request, response) => {
        response.send('Check success');
    });
};

initHttpServer(httpPort);