import * as bodyParser from 'body-parser';
import * as express from 'express';

const httpPort: number = parseInt(process.env.HTTP_PORT) || 8080;

const initHttpServer = (myHttpPort: number) => {
    const app: express.Application = express();
    app.use(bodyParser.json());

    app.get('/check', (req, res) => {
        res.send('Check success');
    });

    app.listen(myHttpPort, () => {
        console.log(`Application listening on port ${ myHttpPort }`);
    });
};

initHttpServer(httpPort);