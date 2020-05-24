import { MessageType } from "../enum/MessageType";

export class Message {
    private readonly type: MessageType;
    private readonly data: any;

    constructor(messageType: MessageType, data: any)
    {
        this.type = messageType;
        this.data = data;
    }

    public getMessageType(): MessageType
    {
        return this.type;
    }

    public getData(): any
    {
        return this.data;
    }
}