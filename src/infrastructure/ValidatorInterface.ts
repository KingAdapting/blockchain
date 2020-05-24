import { Block } from '../model/Block';

export interface ValidatorInterface {
    validate: (newBlock: Block, previousBlock: Block) => boolean;
}