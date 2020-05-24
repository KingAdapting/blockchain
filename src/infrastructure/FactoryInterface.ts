import { Block } from '../model/Block';

export interface FactoryInterface
{
    createGenesisBlock: () => Block;
    createNextBlock: (previousBlock: Block, blockData: string) => Block;
}