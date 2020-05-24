import { Block } from '../model/Block';

export class BlockFactory
{
    private static GENESIS_INDEX = 0;
    private static GENESIS_HASH = '625da44e4eaf58d61cf048d168aa6f5e492dea166d8bb54ec06c30de07db57e1';
    private static GENESIS_DATA = 'First block';

    public static createGenesisBlock(): Block
    {
        return new Block(
            this.GENESIS_INDEX,
            this.GENESIS_HASH,
            null,
            Date.now() / 1000,
            this.GENESIS_DATA
        );
    }

    public static createNextBlock(previousBlock: Block, blockData: string): Block
    {
        const nextIndex: number = previousBlock.getIndex() + 1;
        const nextTimestamp: number = new Date.now() / 1000;
    }
}