import { inject, injectable } from 'inversify';

import { TYPES } from '../dependency-injection/types';
import { Block } from '../model/Block';
import { ValidatorInterface } from '../infrastructure/ValidatorInterface';
import { HashGenerator } from './HashGenerator';

@injectable()
export class BlockValidator implements ValidatorInterface
{
    constructor(
        @inject(TYPES.HashGenerator) private hashGenerator: HashGenerator
    ) { }

    public validate(newBlock: Block, previousBlock: Block): boolean
    {
        if (!BlockValidator.isBlockHasValidStructure(newBlock)) {
            throw new Error('Invalid block structure');
        }

        if (previousBlock.getIndex() + 1 !== newBlock.getIndex()) {
            throw new Error('Invalid block index');
        }

        if (previousBlock.getHash() !== newBlock.getPreviousHash()) {
            throw new Error('Invalid previous block hash');
        }

        const hashToVerifyBlockIntegrity = this.hashGenerator.generate(
            newBlock.getIndex(),
            newBlock.getPreviousHash(),
            newBlock.getTimestamp(),
            newBlock.getData()
        );
        if (hashToVerifyBlockIntegrity !== newBlock.getHash()) {
            throw new Error('Block hash integrity has been compromised');
        }

        return true;
    }

    public validateChain(blockchainToValidate: Block[], genesisBlock: Block): boolean
    {
        if (!BlockValidator.isGenesisBlockValid(blockchainToValidate[0], genesisBlock)) {
            throw new Error('Invalid genesis block');
        }

        for (let i = 1, length = blockchainToValidate.length; i < length; i++) {
            this.validate(blockchainToValidate[i], blockchainToValidate[i - 1]);
        }

        return true;
    }

    private static isBlockHasValidStructure(block: Block): boolean
    {
        return typeof block.getIndex() === 'number'
            && typeof block.getHash() === 'string'
            && typeof block.getPreviousHash() === 'string'
            && typeof block.getTimestamp() === 'number'
            && typeof block.getData() === 'string'
        ;
    }

    private static isGenesisBlockValid(block: Block, genesisBlock: Block): boolean
    {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    }
}