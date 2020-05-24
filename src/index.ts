import * as bodyParser from 'body-parser';
import * as express from 'express';
import 'reflect-metadata';

import { ManagerInterface } from './infrastructure/ManagerInterface';
import { TYPES } from './dependency-injection/types';
import { DIContainer } from './dependency-injection/DIContainer';

const manager = DIContainer.get<ManagerInterface>(TYPES.BlockchainManager);

const httpPort: number = parseInt(process.env.HTTP_PORT) || 8080;

const initHttpServer = (myHttpPort: number) => {
    const app: express.Application = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => {
        res.send(manager.getBlockchain());
    });

    app.post('/mine-block', (req, res) => {
        res.send(manager.addBlock(req.body.data))
    });

    app.listen(myHttpPort, () => {
        console.log(`Application listening on port ${ myHttpPort }`);
    });
};

initHttpServer(httpPort);