import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as WebSocket from 'ws';
import 'reflect-metadata';
import { Server } from 'ws';

import { ManagerInterface } from './infrastructure/ManagerInterface';
import { TYPES } from './dependency-injection/types';
import { DIContainer } from './dependency-injection/DIContainer';

const manager = DIContainer.get<ManagerInterface>(TYPES.BlockchainManager);

const httpPort: number = parseInt(process.env.HTTP_PORT) || 8080;
const p2pPort: number = parseInt(process.env.P2P_PORT) || 8081;

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

const initP2PServer = (p2pPort: number) => {
    const server: Server = new WebSocket.Server({ port: p2pPort });
    console.log(`Listening websocket p2p port on ${ p2pPort }`);
};

initHttpServer(httpPort);
initP2PServer(p2pPort);