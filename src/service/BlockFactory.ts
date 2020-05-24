import { injectable, inject } from 'inversify';

import { TYPES } from '../dependency-injection/types';
import { Block } from '../model/Block';
import { HashGenerator } from './HashGenerator';
import { FactoryInterface } from '../infrastructure/FactoryInterface';

@injectable()
export class BlockFactory implements FactoryInterface
{
    private GENESIS_INDEX = 0;
    private GENESIS_HASH = '625da44e4eaf58d61cf048d168aa6f5e492dea166d8bb54ec06c30de07db57e1';
    private GENESIS_DATA = 'First block';

    constructor(
        @inject(TYPES.HashGenerator) private hashGenerator: HashGenerator
    ) { }

    public createGenesisBlock(): Block
    {
        return new Block(
            this.GENESIS_INDEX,
            this.GENESIS_HASH,
            null,
            Date.now() / 1000,
            this.GENESIS_DATA
        );
    }

    public createNextBlock(previousBlock: Block, blockData: string): Block
    {
        const nextIndex: number = previousBlock.getIndex() + 1;
        const nextTimestamp: number = Date.now() / 1000;
        const nextHash: string = this.hashGenerator.generate(
            nextIndex,
            previousBlock.getHash(),
            nextTimestamp,
            blockData
        );

        return new Block(
            nextIndex,
            nextHash,
            previousBlock.getHash(),
            nextTimestamp,
            blockData
        );
    }
}