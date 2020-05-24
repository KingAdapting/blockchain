import { Block } from '../model/Block';

export interface ManagerInterface
{
    getBlockchain: () => Block[];
    addBlock: (blockData: string) => Block;
}