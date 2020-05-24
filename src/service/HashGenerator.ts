import * as CryptoJS from 'crypto-js';

class HashGenerator {
    public generate(index: number, previousHash: string, timestamp: number, data: string): string
    {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    }
}