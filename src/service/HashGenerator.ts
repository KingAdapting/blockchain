import * as CryptoJS from 'crypto-js';
import { injectable } from 'inversify';

import { HashGeneratorInterface } from '../infrastructure/HashGeneratorInterface';

@injectable()
export class HashGenerator implements HashGeneratorInterface {
    public generate(index: number, previousHash: string, timestamp: number, data: string): string
    {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    }
}