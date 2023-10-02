import * as crypto from 'crypto';
import { createHash } from "crypto";

export function SHA256(password: string) {
    const passHash = createHash("sha256").update(password).digest("hex")
    return passHash
}

// Generating pubKey and privKey pair
export function GenerateKeys() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
    })
    const publicKeyString = publicKey.export({ format: 'pem', type: 'spki' }).toString();
    const privateKeyString = privateKey.export({ format: 'pem', type: 'pkcs8' }).toString();

    return { pubKey: publicKeyString, privKey: privateKeyString };
}

// Encryption using pubKey
export function Encryption(SHA: string, publicKey: string) {
    const encrypt = crypto.publicEncrypt(publicKey, Buffer.from(SHA))
    const ENC = encrypt.toString('base64')
    return ENC
}

// Decryption using corresponding pvtKey
export function Decryption(ENC: string, privateKey: string) {
    const decrypt = crypto.privateEncrypt(privateKey, Buffer.from(ENC, 'base64'))
    return decrypt.toString('utf-8')
}

// AES encryption of pvtKey using password
export function Encryption_AES(privateKey: string, pass: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(pass), iv)
    const encrypt = Buffer.concat([cipher.update(Buffer.from(privateKey, 'utf8')), cipher.final()])

    return iv.toString('base64') + ':' + encrypt.toString('base64');
}

// AES decryption of pvtKey using password
export function Decryption_AES(ENC: string, pass: string) {
    const [ivString, encryptedData] = ENC.split(':');
    const iv = Buffer.from(ivString, 'base64');
    const encrypt = Buffer.from(encryptedData, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(pass), iv);
    return Buffer.concat([decipher.update(encrypt), decipher.final()]).toString('utf-8');
}