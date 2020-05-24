import { inject, injectable } from 'inversify';

import { TYPES } from '../dependency-injection/types';
import { Block } from '../model/Block';
import { ManagerInterface } from '../infrastructure/ManagerInterface';
import { BlockFactory } from './BlockFactory';
import { BlockValidator } from './BlockValidator';
import { ApiError } from '../model/DTO/ApiError';

@injectable()
export class BlockchainManager implements ManagerInterface
{
    private blockchain: Block[] = [];

    constructor(
        @inject(TYPES.BlockFactory) private blockFactory: BlockFactory,
        @inject(TYPES.Validator) private blockValidator: BlockValidator
    ) {
        this.blockchain.push(this.blockFactory.createGenesisBlock())
    }

    public getBlockchain(): Block[]
    {
        return this.blockchain;
    }

    public addBlock(blockData: string): Block|ApiError
    {
        try {
            const newBlock = this.blockFactory.createNextBlock(this.getLatestBlock(), blockData);

            if (this.blockValidator.validate(newBlock, this.getLatestBlock())) {
                this.blockchain.push(newBlock);
            }

            return newBlock;
        } catch ({ message }) {
            return new ApiError(400, message);
        }
    }

    private getLatestBlock(): Block
    {
        return this.blockchain[this.blockchain.length - 1];
    }
}