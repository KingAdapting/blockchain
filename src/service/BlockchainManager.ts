import { Block } from '../model/Block';
import { BlockFactory } from './BlockFactory';
import { ManagerInterface } from "./ManagerInterface";

class BlockchainManager implements ManagerInterface
{
    private blockchain: Block[];

    constructor() {
        this.blockchain.push(BlockFactory.createGenesisBlock())
    }

    public getBlockchain(): Block[]
    {
        return this.blockchain;
    }



    private getLatestBlock(): Block
    {
        return this.blockchain[this.blockchain.length - 1];
    }
}