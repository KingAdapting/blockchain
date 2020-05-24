import { Block } from '../model/Block';

export interface FactoryInterface {
    createGenesisBlock: () => Block;
}