import { inject, injectable } from 'inversify';

import { TYPES } from '../dependency-injection/types';
import { Block } from '../model/Block';
import { ManagerInterface } from '../infrastructure/ManagerInterface';
import { BlockFactory} from "./BlockFactory";

@injectable()
export class BlockchainManager implements ManagerInterface
{
    private blockchain: Block[] = [];

    constructor(
        @inject(TYPES.BlockFactory) private blockFactory: BlockFactory
    ) {
        this.blockchain.push(this.blockFactory.createGenesisBlock())
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