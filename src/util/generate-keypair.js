import { generateKeyPairSync } from 'crypto';
import path from 'path';
import { mkdirSync,writeFileSync } from 'fs';

export function generateKeyPairAndSave(keysFolderPath,modulusLength) {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: modulusLength, 
        publicKeyEncoding: {
          type: "pkcs1", 
          format: "pem" 
        },
        privateKeyEncoding: {
          type: "pkcs1", 
          format: "pem", 
        }
      });

    mkdirSync(keysFolderPath,{recursive:true});
    writeFileSync(path.join(keysFolderPath, 'key.pem'), privateKey);
    writeFileSync(path.join(keysFolderPath, 'key.pem.pub'), publicKey);
}