import * as WebSocket from 'ws';

export class SocketManager {
    private sockets: WebSocket[] = [];

    public getSockets(): WebSocket[]
    {
        return this.sockets;
    }

    public initConnection(ws: WebSocket)
    {
        this.sockets.push(ws);
        this.initConnection(ws);
    };

    private initMessageHandler(ws: WebSocket)
    {
        // TODO init
    }
}