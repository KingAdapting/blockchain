import * as WebSocket from 'ws';
import { inject } from 'inversify';

import { TYPES } from '../dependency-injection/types';
import { Message } from '../model/Message';
import { JsonToObjectConverter } from './JsonToObjectConverter';
import { MessageType } from '../enum/MessageType';
import { BlockchainManager } from './BlockchainManager';

export class SocketManager {
    private sockets: WebSocket[] = [];

    constructor(
        @inject(TYPES.JsonConverter) private jsonConverter: JsonToObjectConverter,
        @inject(TYPES.BlockchainManager) private blockchainManager: BlockchainManager
    ) {
    }

    public getSockets(): WebSocket[]
    {
        return this.sockets;
    }

    public initConnection(ws: WebSocket)
    {
        this.sockets.push(ws);
        this.initMessageHandler(ws);
    };

    private initMessageHandler(ws: WebSocket)
    {
        ws.on('message', (data: string) => {
            const message: Message = this.jsonConverter.convert(data);
            if (null === message) {
                return;
            }
            switch (message.getMessageType()) {
                case MessageType.QUERY_LATEST:
                    this.write(ws, this.createLatestMessageResponse());
                    break;
                case MessageType.QUERY_ALL:
            }
        });
    }

    private write(ws: WebSocket, message: Message): void
    {
        ws.send(JSON.stringify(message));
    }

    private createLatestMessageResponse(): Message
    {
        return new Message(
            MessageType.RESPONSE_BLOCKCHAIN,
            JSON.stringify(this.blockchainManager.getLatestBlock())
        );
    }
}