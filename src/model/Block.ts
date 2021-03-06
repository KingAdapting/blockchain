export class Block
{
    private readonly index: number;
    private readonly hash: string;
    private readonly previousHash: string;
    private readonly timestamp: number;
    private readonly data: string;

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        timestamp: number,
        data: string
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }

    public getIndex(): number
    {
        return this.index;
    }

    public getHash(): string
    {
        return this.hash;
    }

    public getPreviousHash(): string
    {
        return this.previousHash;
    }

    public getTimestamp(): number
    {
        return this.timestamp
    }

    public getData(): string
    {
        return this.data;
    }
}