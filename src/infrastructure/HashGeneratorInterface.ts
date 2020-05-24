import { Block } from "../model/Block";

export interface HashGeneratorInterface
{
    generate: (index: number, previousHash: string, timestamp: number, data: string) => string;
}