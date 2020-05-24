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
    private readonly genesisBlock: Block;
    private blockchain: Block[] = [];

    constructor(
        @inject(TYPES.BlockFactory) private blockFactory: BlockFactory,
        @inject(TYPES.Validator) private blockValidator: BlockValidator
    ) {
        this.genesisBlock = this.blockFactory.createGenesisBlock();
        this.blockchain.push(this.genesisBlock);
    }

    public getBlockchain(): Block[]
    {
        return this.blockchain;
    }

    public getLatestBlock(): Block
    {
        return this.blockchain[this.blockchain.length - 1];
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
}