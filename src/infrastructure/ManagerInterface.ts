import { Block } from '../model/Block';
import { ApiError } from '../model/DTO/ApiError';

export interface ManagerInterface
{
    getBlockchain: () => Block[];
    getLatestBlock: () => Block;
    addBlock: (blockData: string) => Block|ApiError;
}